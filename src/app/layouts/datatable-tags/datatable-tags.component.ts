import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TagService } from '../../services/tag.service';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-datatable-tags',
  templateUrl: './datatable-tags.component.html',
  styleUrls: ['./datatable-tags.component.css']
})
export class DatatableTagsComponent implements OnInit {

  displayedColumns: string[] = ['uid', 'createdAt', 'state', 'value', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private tagService: TagService) {
    this.tagService.tags.subscribe(tags => {
      this.dataSource = new MatTableDataSource(tags);
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

  openDialog(categoryDoc, value): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
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
        this.tagService.setTag(data);
        console.log(data);
      }
    });
  }

  ngOnInit() {
  }

  delTag(tagDoc) {
    this.tagService.delTag(tagDoc);
  }

  aprobTag(uid, val) {
    this.tagService.aprobTag(uid, val);
  }

}
