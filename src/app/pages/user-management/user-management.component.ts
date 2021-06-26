import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserManagementService } from './user-management.service';

export interface UserElement {
  username: string;
  email: number;
  walletAddress: string;
  locked: number;
  createdAt: Date;
}

@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public displayedColumns: any;
  public dataSource: any;
  public totalItems: number;

  public pageSize = 5;
  public pageIndex = 0;

  public username: string;
  public email: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userManagementService: UserManagementService,
    private dialog: MatDialog
  ) {

  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    this.displayedColumns = ['username', 'email', 'walletAddress', 'locked', 'createdAt', 'updatedAt', 'operation'];
    this.search();
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.search();
  }

  applyFilter(event: Event) {

  }

  public search() {
    if(this.username || this.email) {
      this.pageIndex = 0;
      this.totalItems = 0;
    }
    console.log(this.username);
    this.userManagementService.count({ username: this.username, email: this.email }).subscribe(c => {
      console.log(c);
      this.totalItems = c;
    });
    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;
    this.userManagementService.list(skip, limit, {
      username: this.username,
      email: this.email
    }).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserElement>(data);
      // this.dataSource.paginator = this.paginator;
    });
  }

  public add() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: 'md'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.search();
    });
  }

  public edit(row) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: 'md',
      data: { ...row }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.search();
    });
  }

}
