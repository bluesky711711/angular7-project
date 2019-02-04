import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit {
  @Output() imageOut = new EventEmitter();
  @Output() imageName = new EventEmitter();
  @Output() imageEdit = new EventEmitter();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  portada: any = '/assets/img/utils/no_portada.png';
  edit_image = false;

  data: any;
  cropperSettings: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  imageURL: string;
  fileName: string;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  canvasWidth: any;
  canvasHeight: any;

  constructor(@Inject(WINDOW) private window: Window, @Inject(PLATFORM_ID) private platformId: any, private storage: AngularFireStorage, private toastr: ToastrService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 1920;
    this.cropperSettings.height = 650;
    this.cropperSettings.croppedWidth = 1920;
    this.cropperSettings.croppedHeight = 650;
    // this.cropperSettings.canvasWidth = 750;
    // this.cropperSettings.canvasHeight = 500;
    this.cropperSettings.minWidth = 1200;
    this.cropperSettings.minHeight = 650;
    this.cropperSettings.keepAspect = false;

    this.data = {};
    this.loadCropper();
  }

  loadCropper() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.window.screen.availWidth >= 1000) {
        this.canvasWidth = 750;
        this.canvasHeight = 500;
      } else if (this.window.screen.availWidth < 1000 && this.window.screen.availWidth >= 500) {
        this.canvasWidth = 450;
        this.canvasHeight = 400;
      } else {
        this.canvasWidth = 300;
        this.canvasHeight = 200;
      }
      this.cropperSettings.canvasHeight = this.canvasHeight;
      this.cropperSettings.canvasWidth = this.canvasWidth;
    }
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
      this.imageName.emit(this.fileName);
      return this.imageOut.emit(this.imageURL);
    } else {
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
    const name = `${new Date().getTime()}_${file.name}`;
    const path = `posts/${name}`;

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
          .then((url) => {
            this.imageName.emit(name);
            return this.imageOut.emit(url);
          })
          .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
      })
    ).subscribe();
  }

  // Determines if the upload task is active
  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }
  editImage() {
    this.edit_image = this.edit_image ? false : true;
    this.imageEdit.emit(this.edit_image);
  }

  chargeImage() {
    const element: HTMLElement = document.getElementById('custom-input') as HTMLElement;
    element.click();
  }

}
