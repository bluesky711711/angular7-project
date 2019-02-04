import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as  Storage from '@google-cloud/storage';
import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

//(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const gcs = new Storage();
const BUCKET_NAME = 'piensadigital-desarrollo.appspot.com';
admin.initializeApp();
const settings = { timestampsInSnapshots: true };
//admin.firestore().settings(settings);

exports.createIndex = functions.firestore
    .document('posts/{postId}')
    .onWrite(async (change, context) => {
        const postId = change.before.data().uid;
        const post = change.after.data();
        const imageName = change.after.data().imageName;
        const imageNameOld = change.after.data().imageName;

        if (imageNameOld !== imageName) {
            console.log('las imagenes no coinciden');
            return false;
        }
        if (!imageName) {
            console.log('No se detecto nombre de la imagen');
            return false;
        }
        const stateOld = change.before.data().state;
        const stateNew = change.after.data().state;
        if (stateOld === 'pendiente' && stateNew === 'aprobado') {
            console.log('Creando imagen...');
            const workingDir = join(tmpdir(), 'thumbs');
            await fs.remove(workingDir);
        // if (stateNew === 'aprobado') {
            const searchableIndex = createIndex(post.uid, post.category, post.subcategory, post.tags);
            const thumbnails = await createThumbs(imageName);
            const indexedPost = { ...post, searchableIndex, thumbnails }
            const db = admin.firestore();
            return db.collection('posts').doc(postId).update(indexedPost)
        } else {
            return null;
        }
    });

function createIndex(uid, category, subcategory, tags) {
    const url = uid.toLowerCase().split('-');
    const tags_array = Object.keys(tags).map((key) => tags[key]);
    const array = url.concat(tags_array);
    array.push(category);
    array.push(subcategory);
    const searchableIndex = {};
    for (const word of array) {
        const arr = word.split('');
        let prevKey = '';
        for (const char of arr) {
            const key = prevKey + char;
            if (key.length >= 2) {
                searchableIndex[key] = true;
            }
            prevKey = key;
        }
    }
    return searchableIndex;
}

async function createThumbs(imageName) {
    const bucket = gcs.bucket(BUCKET_NAME);
    const filePath = 'posts/' + imageName;
    const filePathThumbs = 'posts/thumbs/' + imageName;
    const fileName = filePath.split('/').pop();
    const bucketDir = dirname(filePathThumbs);
    const path = filePath.split('/', 2);
    console.log('filePath: '+filePath);
    // console.log('filePathThumbs: '+filePathThumbs);
    // console.log('fileName: '+fileName);
    
    

    if (path[0] === 'posts' && path[1] === 'images') {
        console.log('Fuera de post');
        return false;
    }

    const workingDir = join(tmpdir(), 'thumbs');
    // console.log('workingDir: ' + workingDir);
    const tmpFilePath = join(workingDir, 'source.png');

    // if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
    if (fileName.includes('thumb@')) {
        console.log('exiting function');
        return false;
    }

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
        destination: tmpFilePath
    });

    // 3. Resize the images and define an array of upload promises
    const sizes = [500, 1010];
    const thumbnails = {};
    const uploadPromises = sizes.map(async size => {
        const thumbName = `thumb@${size}_${fileName}`;
        // thumbnails[size] = 'posts/'+thumbName;
        const thumbPath = join(workingDir, thumbName);
        // console.log('thumbName: ' + thumbName);
        // console.log('thumbPath: ' + thumbPath);
        let sizeY = size;
        if (size === 500) {
            sizeY = 170;
        } else if (size === 1010) {
            sizeY = 350;
        }
        // Resize source image
        await sharp(tmpFilePath)
            .resize(size, sizeY)
            .toFile(thumbPath);

        // Upload to GCS
        return bucket.upload(thumbPath, {
            destination: join(bucketDir, thumbName)
        }).then(() => {
            const urlEncodedFilePath = encodeURIComponent('posts/thumbs/'+thumbName);
            const url = 'https://firebasestorage.googleapis.com/v0/b/'+BUCKET_NAME+'/o/'+urlEncodedFilePath+'?alt=media';
            return thumbnails[size] = url;
        });
        
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises);

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    await fs.remove(workingDir);
    return thumbnails;
    
}