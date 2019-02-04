import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css']
})
export class TagDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tag) { }

  value: any = this.data.value;

  onNoClick(): void {
    this.dialogRef.close();
  }

  setTag() {
    if (this.value) {
      this.dialogRef.close(this.value);
    }
  }

}
