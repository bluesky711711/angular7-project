import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-datatable-categories',
  templateUrl: './datatable-categories.component.html',
  styleUrls: ['./datatable-categories.component.css']
})
export class DatatableCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'createdAt', 'value', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {
    this.categoryService.categories.subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

  openDialog(categoryDoc, value): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { value: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          updateAt: Date(),
          uid: categoryDoc,
          value: result
        };
        this.categoryService.setCategory(data);
        console.log(data);
      }
    });
  }

  delCategory(categoryDoc) {
    this.categoryService.delCategory(categoryDoc);
  }

}
