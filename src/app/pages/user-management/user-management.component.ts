import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
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
  public count: Observable<number>;

  public pageSize = 10;
  public pageIndex = 0;

  public username: string;
  public email: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userManagementService: UserManagementService) {

  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    this.displayedColumns = ['username', 'email', 'walletAddress', 'locked', 'createdAt'];

    this.count = this.userManagementService.count();
    this.userManagementService.list(this.pageIndex * this.pageSize, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserElement>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;
    this.userManagementService.list(skip, limit).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserElement>(data);
    })
  }

  applyFilter(event: Event) {

  }

  public search(event) {
    console.log(this.username);
    const skip = this.pageIndex * this.pageSize;
    const limit = this.pageSize;
    this.userManagementService.list(skip, limit, {
      username: this.username,
      email: this.email
    }).subscribe(data => {
      this.dataSource = new MatTableDataSource<UserElement>(data);
    });
  }

}
