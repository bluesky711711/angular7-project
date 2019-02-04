import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  value: any = this.data.value;

  onNoClick(): void {
    this.dialogRef.close();
  }

  setCategory() {
    if (this.value) {
      this.dialogRef.close(this.value);
    }
  }

}
