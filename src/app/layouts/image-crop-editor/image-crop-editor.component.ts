import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Output, EventEmitter, ViewChild , Inject} from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { NgProgressComponent, NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-image-crop-editor',
  templateUrl: './image-crop-editor.component.html',
  styleUrls: ['./image-crop-editor.component.css']
})
export class ImageCropEditorComponent implements OnInit {
  @Output() imageOut = new EventEmitter();
  @Output() imageEdit = new EventEmitter();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  portada: any = '/assets/img/utils/bg_example.jpg';
  edit_image = false;

  data: any;
  cropperSettings: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  imageURL: string;
  fileName: string;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  canvasWidth: number;
  canvasHeight: number;

  progress: NgProgressRef;

  constructor(@Inject(WINDOW) private window: Window, private storage: AngularFireStorage,
              private db: AngularFirestore,
              private toastr: ToastrService,
              private progressRef: NgProgress) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 1920;
    this.cropperSettings.height = 400;
    this.cropperSettings.croppedWidth = 1920;
    this.cropperSettings.croppedHeight = 400;
    this.cropperSettings.canvasWidth = 585;
    this.cropperSettings.canvasHeight = 250;
    this.cropperSettings.minWidth = 1920;
    this.cropperSettings.minHeight = 400;
    this.cropperSettings.keepAspect = false;

    this.data = {};
    this.loadCropper();
    this.progress = this.progressRef.ref();
  }

  loadCropper() {
    if (this.window.screen.availWidth >= 1000) {
      this.canvasWidth = 585;
      this.canvasHeight = 250;
    } else if (this.window.screen.availWidth < 1000 && this.window.screen.availWidth >= 500) {
      this.canvasWidth = 480;
      this.canvasHeight = 250;
    } else {
      this.canvasWidth = 300;
      this.canvasHeight = 200;
    }
    this.cropperSettings.canvasHeight = this.canvasHeight;
    this.cropperSettings.canvasWidth = this.canvasWidth;
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileName = file.name;
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  public crop() {
    if (this.data.image) {
      return this.urltoFile(this.data.image, this.fileName)
        .then(file => this.startUpload(file)).catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
    } else if (this.imageURL) {
      return this.imageOut.emit(this.imageURL);
    } else {
      this.progress.complete();
      this.toastr.error('No hay cargada una imagen!', 'Piensa digital');
    }
  }

  urltoFile(url, filename) {
    const arr = url.split(',');
    const mimeType = arr[0].match(/:(.*?);/)[1];
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }


  public getImage(imageIn) {
    // this.storage.ref(imageIn).getDownloadURL().subscribe(res => this.imageURL = res);
    this.imageURL = imageIn;
  }

  ngOnInit() {
  }



  startUpload(file) {
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      this.toastr.error('Formato no soportado!', 'Piensa digital');
      return;
    }
    // The storage path
    const path = `users/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Piensa digital' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    const fileRef = this.storage.ref(path);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise()
          .then((url) => this.imageOut.emit(url))
          .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
      })
    ).subscribe();
  }

  // Determines if the upload task is active
  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }
  editImage() {
    const element: HTMLElement = document.getElementById('custom-input') as HTMLElement;
    element.click();
  }

  changeImage() {
    this.edit_image = this.edit_image ? false : true;
    this.imageEdit.emit(this.edit_image);
  }

  uploadImage() {
    this.progress.start();
    this.edit_image = this.edit_image ? false : true;
    this.imageEdit.emit(this.edit_image);
    this.crop();
  }

  close() {
    this.edit_image = this.edit_image ? false : true;
    this.imageEdit.emit(this.edit_image);
  }

}
