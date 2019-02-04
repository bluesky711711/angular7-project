import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-datatable-posts',
  templateUrl: './datatable-posts.component.html',
  styleUrls: ['./datatable-posts.component.css']
})
export class DatatablePostsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['uid', 'state', 'recommended', 'homePost', 'createdAt', 'category', 'editor', 'title', 'postCount', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe(posts => {
      this.dataSource = new MatTableDataSource(posts);
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

  aprobPost(uid, val) {
    this.postService.aprobPost(uid, val);
  }

  recommendPost(uid, val) {
    this.postService.recommendPost(uid, val);
  }

  setHomePost(uid, val) {
    this.postService.setHomePost(uid, val);
  }

}
