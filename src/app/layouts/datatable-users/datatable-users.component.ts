import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-datatable-users',
  templateUrl: './datatable-users.component.html',
  styleUrls: ['./datatable-users.component.css']
})
export class DatatableUsersComponent {
  displayedColumns: string[] = ['displayName', 'email', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private datatable: UserService) {
    this.datatable.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
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

  updateRol(rol, user) {
    const val = rol === 'admin' ? user.roles.admin : rol === 'editor' ? user.roles.editor :
    rol === 'contributor' ? user.roles.contributor : user.roles.subscriber;
    const data = {
      uid: user.uid,
      rol: rol,
      val: val,
      visitCount: user.visitCount,
      followerCount: user.followerCount
    };
    this.datatable.updateRol(data);
  }
}

