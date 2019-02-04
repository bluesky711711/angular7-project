"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Storage = require("@google-cloud/storage");
const os_1 = require("os");
const path_1 = require("path");
const sharp = require("sharp");
const fs = require("fs-extra");
const gcs = new Storage();
const BUCKET_NAME = 'piensadigital-desarrollo.appspot.com';
admin.initializeApp();
const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
exports.createIndex = functions.firestore
    .document('posts/{postId}')
    .onWrite((change, context) => __awaiter(this, void 0, void 0, function* () {
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
        const workingDir = path_1.join(os_1.tmpdir(), 'thumbs');
        yield fs.remove(workingDir);
        // if (stateNew === 'aprobado') {
        const searchableIndex = createIndex(post.uid, post.category, post.subcategory, post.tags);
        const thumbnails = yield createThumbs(imageName);
        const indexedPost = Object.assign({}, post, { searchableIndex, thumbnails });
        const db = admin.firestore();
        return db.collection('posts').doc(postId).update(indexedPost);
    }
    else {
        return null;
    }
}));
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
function createThumbs(imageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = gcs.bucket(BUCKET_NAME);
        const filePath = 'posts/' + imageName;
        const filePathThumbs = 'posts/thumbs/' + imageName;
        const fileName = filePath.split('/').pop();
        const bucketDir = path_1.dirname(filePathThumbs);
        const path = filePath.split('/', 2);
        console.log('filePath: ' + filePath);
        // console.log('filePathThumbs: '+filePathThumbs);
        // console.log('fileName: '+fileName);
        if (path[0] === 'posts' && path[1] === 'images') {
            console.log('Fuera de post');
            return false;
        }
        const workingDir = path_1.join(os_1.tmpdir(), 'thumbs');
        // console.log('workingDir: ' + workingDir);
        const tmpFilePath = path_1.join(workingDir, 'source.png');
        // if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        if (fileName.includes('thumb@')) {
            console.log('exiting function');
            return false;
        }
        // 1. Ensure thumbnail dir exists
        yield fs.ensureDir(workingDir);
        // 2. Download Source File
        yield bucket.file(filePath).download({
            destination: tmpFilePath
        });
        // 3. Resize the images and define an array of upload promises
        const sizes = [500, 1010];
        const thumbnails = {};
        const uploadPromises = sizes.map((size) => __awaiter(this, void 0, void 0, function* () {
            const thumbName = `thumb@${size}_${fileName}`;
            // thumbnails[size] = 'posts/'+thumbName;
            const thumbPath = path_1.join(workingDir, thumbName);
            // console.log('thumbName: ' + thumbName);
            // console.log('thumbPath: ' + thumbPath);
            let sizeY = size;
            if (size === 500) {
                sizeY = 170;
            }
            else if (size === 1010) {
                sizeY = 350;
            }
            // Resize source image
            yield sharp(tmpFilePath)
                .resize(size, sizeY)
                .toFile(thumbPath);
            // Upload to GCS
            return bucket.upload(thumbPath, {
                destination: path_1.join(bucketDir, thumbName)
            }).then(() => {
                const urlEncodedFilePath = encodeURIComponent('posts/thumbs/' + thumbName);
                const url = 'https://firebasestorage.googleapis.com/v0/b/' + BUCKET_NAME + '/o/' + urlEncodedFilePath + '?alt=media';
                return thumbnails[size] = url;
            });
        }));
        // 4. Run the upload operations
        yield Promise.all(uploadPromises);
        // 5. Cleanup remove the tmp/thumbs from the filesystem
        yield fs.remove(workingDir);
        return thumbnails;
    });
}
//# sourceMappingURL=index.js.map