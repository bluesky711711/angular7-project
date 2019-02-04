import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.css']
})
export class SubcategoryDialogComponent implements OnInit {
  categories;
  value: any = this.data.value;
  value_cat: any;
  value_ext: any;

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<SubcategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.categories = this.categoryService.categories;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  setSubcategory() {
    if (this.value && this.value_cat) {
      this.dialogRef.close({'sub': this.value, 'cat': this.value_cat});
    }
  }

  ngChange(event) {
    this.value_cat = event;
  }

}
