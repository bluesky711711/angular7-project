import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { CategoryDialogComponent } from '../../../layouts/category-dialog/category-dialog.component';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryDialogComponent } from '../../../layouts/subcategory-dialog/subcategory-dialog.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categoryDoc: string;
  createdAt: Date;
  value: string;


  constructor(public dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { value: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          createdAt: Date(),
          uid: result.toLowerCase(),
          value: result,
        };
        this.categoryService.setCategory(data);
        // console.log(data);
      }
    });
  }

  openDialogSub(): void {
    const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
      width: '400px',
      data: { value: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.setSubCategory(result);
        // console.log(result.cat);
      }
    });
  }

}

