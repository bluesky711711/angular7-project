import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../services/tag.service';
import { MatDialog } from '@angular/material';
import { TagDialogComponent } from '../../../layouts/tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css']
})
export class AdminTagsComponent implements OnInit {

  constructor(public dialog: MatDialog, private tagService: TagService) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
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
        this.tagService.setTag(data);
        console.log(data);
      }
    });
  }

}
