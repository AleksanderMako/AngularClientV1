import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatRow } from '@angular/material';
import { UsersTableDataSource } from './users-table-datasource';
import { HttpClient } from '@angular/common/http';
import { UserCrudDTO } from '../DTOs/user-crud-dto';
import { User } from '../Models/user';
import { UsersTableItem } from '../Models/dataTableUser';
import DataTransportService from '../services/dataTransportService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersTableDataSource;
  loading: boolean;
  constructor(private client: HttpClient, private dataService: DataTransportService, private router: Router) {

  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'firstname', 'lastname', 'age'];

  ngOnInit() {
    const readUsersListUrl = 'http://localhost:4000/api/user/read';
    this.loading = true;
    return this.client
      .post(readUsersListUrl, {
        functionName: 'read',
        args: undefined
      })
      .subscribe((data: UserCrudDTO) => {
        if (data.opStatus === 'success' && data.hasError === false) {
          const td = data.data
            .map((e: User) => {
              const usr: UsersTableItem = {
                username: e.username,
                age: e.age,
                firstname: e.firstname,
                lastName: e.lastName,
              };
              return usr;
            });
          // alert(JSON.stringify(td));
          this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.client, td);
          this.loading = false;
        } else if (data.opStatus === 'error') {
          alert(`{
          status :${data.opStatus}
          error : ${data.error}
        }`);
        }
      });
  }

  getItem(row: UsersTableItem) {

    // alert(JSON.stringify(row));
    const key = 'toEditUser';
    this.dataService.setToEdit(key, row);
    this.router.navigate(['/UpdateUser']);
  }

}
