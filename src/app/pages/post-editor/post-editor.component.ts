import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropComponent } from '../../layouts/image-crop/image-crop.component';
import { Editor } from '../../models/editor';
import { EditorService } from '../../services/editor.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  @ViewChild(ImageCropComponent) imageCrop: ImageCropComponent;

  post: any = null;
  documentId = null;
  userId = null;
  category = new FormControl('', Validators.required);
  tags = new FormControl('', Validators.required);
  image: string;
  image_name = '';
  date = new Date;
  dateUpd = new Date;
  data_image: any = '/assets/img/utils/no_portada.png';
  edit_image = false;
  class = 'tecnologia';
  category_value = 'categoria';
  subcategory_value = 'categoria';
  show_category = false;
  user: Editor;
  editor: Editor;
  task: AngularFireUploadTask;
  percentage: Observable<number>;

  newPostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: this.category,
    content: new FormControl('', Validators.required),
    tags: this.tags
  });

  progress: NgProgressRef;

  constructor(private postService: PostService,
              private editorService: EditorService,
              private route: ActivatedRoute,
              private router: Router,
              public progressRef: NgProgress,
              private toastr: ToastrService,
              private storage: AngularFireStorage) { }


  async ngOnInit() {
    this.progress = this.progressRef.ref();
    this.user = await this.editorService.isLoggedIn();
    if (this.user) {
      this.userId = this.user.uid;
      this.editor = {
        uid: this.user.uid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        email: this.user.email
      };
    }
    this.route.paramMap.subscribe(params => this.documentId = params.get('id'));
    if (this.documentId !== 'new') {
      if (this.documentId) {
        this.post = this.postService.getPost(this.documentId);
        this.post.subscribe(post => {
          this.date = post.createdAt;
          this.newPostForm.get('url').setValue(post.uid);
          this.newPostForm.get('category').setValue(post.category);
          this.newPostForm.get('title').setValue(post.title);
          this.newPostForm.get('description').setValue(post.description);
          this.newPostForm.get('content').setValue(post.content);
          this.newPostForm.get('tags').setValue(post.tags);
          this.image = post.image;
          this.image_name = post.imageName;
          this.subcategory_value = post.subcategory;
          this.category_value = post.category;
          this.date = post.createdAt;
          this.class = post.category === 'tecnologia' || post.category === 'emprendimiento' ||
            post.category === 'productividad' || post.category === 'liderazgo' ? post.category : 'otro';
          setTimeout(() => {
            this.imageCrop.getImage(post.image);
          }, 100);
        });
      }
    }
  }

  newPost(form) {
    if (this.editor) {
      if (this.documentId === 'new') {
        if (this.image && this.image_name) {
          // this.progress.start();
          const data = {
            uid: form.url,
            user: this.editor,
            createdAt: new Date(),
            title: form.title,
            description: form.description,
            category: form.category,
            subcategory: this.subcategory_value,
            content: form.content,
            tags: form.tags,
            state: 'pendiente',
            recommended: false,
            image: this.image,
            imageName: this.image_name,
            visitCount: 0
          };
          // console.log(data);
          // console.log(this.editor);
          this.postService.createPost(data)
          .then(() => {
            this.progress.complete();
            this.toastr.success('Post creado!', 'Piensa digital');
            this.router.navigate(['/editor', this.userId, 'myposts']);
          }).catch(e => {
            this.progress.complete();
            console.log(e);
            this.toastr.error('Error:' + e, 'Piensa digital');
          });
        } else {
          this.progress.complete();
          this.toastr.success('Seleccione una imagen!', 'Piensa digital');
        }
      } else {
        console.log(this.image_name);
        // this.progress.start();
        const data = {
          // user: this.editor,
          updateAt: new Date(),
          title: form.title,
          description: form.description,
          category: form.category,
          subcategory: this.subcategory_value,
          content: form.content,
          tags: form.tags,
          state: 'pendiente',
          image: this.image,
          imageName: this.image_name
        };
        this.postService.updatePost(this.documentId, data)
        .then(() => {
          this.progress.complete();
          this.toastr.success('Editado!', 'Piensa digital');
          // this.router.navigate(['/editor', this.userId, 'myposts']);
        }).catch(e => {
          this.progress.destroy();
          this.toastr.error('Error:' + e, 'Piensa digital');
        });
      }
    } else {
      this.toastr.error('Usuario no cargo!', 'Piensa digital');
    }
  }

  // tslint:disable-next-line:member-ordering
  public options: Object = {
    language: 'es',
    charCounterCount: true,
    heightMin: 500,
    imageDefaultAlign: 'center',
    imageDefaultWidth: 700,
    imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
    linkAlwaysBlank: true,
    videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
    paragraphFormat: {
      N: 'Normal',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H6: 'Pie de foto'
    },
    toolbarButtons: [
      'fullscreen',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'insertTable',
      'insertHR',
      '|',
      'paragraphFormat',
      // 'fontFamily',
      // 'fontSize',
      // 'color',

      '|',
      'align',
      'formatOL',
      'formatUL',
      'outdent',
      'indent',
      '|',
      'subscript',
      'superscript',
      '|',
      'selectAll',
      'clearFormatting',
      'help',
      '-',
      'insertLink',
      'insertImage',
      'insertVideo',
      '|',
      'undo',
      'redo'
    ],
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'insertTable',
      'insertHR',
      'formatOL',
      'formatUL',
      '-',
      'fontFamily',
      'fontSize',
      'color',
      'align',
      'selectAll',
      '-',
      'insertLink',
      'insertImage',
      'insertVideo',
      '|',
      'undo',
      'redo',
      'fullscreen'
    ],

    // Set the image upload parameter.
    imageUploadParam: 'image_param',

    // Set the image upload URL.
    // imageUploadURL: 'assets/upload_image',

    // Additional upload params.
    imageUploadParams: { id: 'my_editor' },

    // Set request type.
    imageUploadMethod: 'POST',

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'froalaEditor.initialized': function () {
        // console.log('initialized');
      },
      'froalaEditor.image.beforeUpload': (e, editor, images) => {
        // Your code
        if (images.length) {
          const file: File = images[0];
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = (ev) => {
            const path = `posts/images/${new Date().getTime()}_${file.name}`;
            // Totally optional metadata
            const customMetadata = { app: 'Piensa digital' };
            // The main task
            this.task = this.storage.upload(path, file, { customMetadata });
            const fileRef = this.storage.ref(path);
            return this.task.snapshotChanges().pipe(
              finalize(() => {
                return fileRef.getDownloadURL().toPromise()
                  .then((url) => editor.image.insert(url, null, null, editor.image.get()));
                // .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
              })
            ).subscribe();
            // const result = ev.target['result'];
            // editor.image.insert(this.imageUrl, null, null, editor.image.get());
          };
          // Read image as base64.
          reader.readAsDataURL(file);
        }
        // Stop default upload chain.
        return false;
      }
    }
  };

  changeCategory(event): void {
    const data = event.split('-');
    const category = data[0];
    const subcategory = data[1];
    this.newPostForm.get('category').setValue(category);
    this.category_value = category;
    this.subcategory_value = subcategory;
    this.class = category === 'tecnologia' || category === 'emprendimiento' ||
      category === 'productividad' || category === 'liderazgo' ? category : 'otro';
    this.show_category = false;
  }
  editCategory(event) {
    this.show_category = event ? false : true;
  }

  changeTags(event): void {
    this.newPostForm.get('tags').setValue(event);
  }

  changeImage(event, form): void {
    this.image = event;
    this.newPost(form);
  }

  setPost() {
    this.progress.start();
    this.imageCrop.crop();
  }

  editImage($event) {
    this.edit_image = $event;
  }

  imageName($event) {
    if ($event) {
      this.image_name = $event;
    }
  }



}
