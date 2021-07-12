import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
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

  // autocomplete
  public usernameControl = new FormControl();
  public emailControl = new FormControl();
  public filteredUsernameOptions$: Observable<string[]>;
  public filteredEmailOptions$: Observable<string[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userManagementService: UserManagementService,
    private dialog: MatDialog,
  ) {

  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    this.displayedColumns = ['username', 'email', 'walletAddress', 'locked', 'createdAt', 'updatedAt', 'operation'];
    this.search();

    this.filteredUsernameOptions$ = this.usernameControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('username', searchTerm)),
    );

    this.filteredEmailOptions$ = this.emailControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('email', searchTerm)),
    )
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.search();
  }

  applyFilter(event: Event) {

  }

  public search() {
    let username = this.usernameControl.value;
    let email = this.emailControl.value;
    if (username || email) {
      this.pageIndex = 0;
      this.totalItems = 0;
    }
    console.log(username);
    this.userManagementService.count({ username: username, email: email }).subscribe(c => {
      console.log(c);
      this.totalItems = c;
    });
    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;
    this.userManagementService.list(skip, limit, {
      username: username,
      email: email,
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
