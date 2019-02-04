import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Pipe({
    name: 'toPostImage'
})
export class ToPostImagePipe implements PipeTransform {

    constructor(private storage: AngularFireStorage) { }
    transform(value: any): any {
        return this.storage.ref(value).getDownloadURL();
    }

}
