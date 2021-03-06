import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ReleaseService } from './release.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table';
import { ReleaseCreateComponent } from './release-create/release-create.component';
import { ReleaseDeleteConfirmComponent } from './release-delete-confirm/release-delete-confirm.component';
import { FormControl } from '@angular/forms';
import { UserManagementService } from '../user-management/user-management.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  public displayedColumns: any;
  public dataSource: any;
  public currentLength: Observable<number>
  public limit: number;
  public skip: number;
  public currentUserName: string;
  public currentReocrdNumber: string;
  public currentFilter: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   // autocomplete
   public usernameControl = new FormControl();
   public orderControl = new FormControl();
   public filteredUsernameOptions$: Observable<string[]>;
   public filteredOrderOptions$: Observable<string[]>;

  constructor(private releaseService: ReleaseService, public dialog: MatDialog, private _snackBar: MatSnackBar,private userManagementService: UserManagementService) {
    this.currentFilter = {
      "status": "ACTIVE",
      "orderType": "RELEASE"
    }
  }

  ngOnInit(): void {
    this.currentLength = this.releaseService.getReleaseLength(this.currentFilter);
    this.releaseService.getReleases(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'txtid', 'symbol', 'delete']
      const availableRelease = data;
      this.dataSource = new MatTableDataSource<any>(availableRelease);
      this.dataSource.paginator = this.paginator;
    })

    
    this.filteredUsernameOptions$ = this.usernameControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('username', searchTerm)),
    );

    this.filteredOrderOptions$ = this.orderControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.releaseService.search('recordNumber', searchTerm)),
    )

  }

  changePage(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.limit = limit;
    this.skip = skip;
    this.currentLength = this.releaseService.getReleaseLength(this.currentFilter);
    this.releaseService.getReleases(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'txtid', 'symbol', 'delete']
      const availableRelease = data;
      this.dataSource = new MatTableDataSource<any>(availableRelease);
    })
  }

  onNewRelease() {
    const dialogRef = this.dialog.open(ReleaseCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentLength = this.releaseService.getReleaseLength(this.currentFilter);
      this.limit = 5;
      this.skip = 0;
      this.releaseService.getReleases(this.limit, this.skip, this.currentFilter).subscribe(data => {
        this.displayedColumns = ['position', 'name', 'weight', 'txtid', 'symbol', 'delete']
        const availableRelease = data;
        this.dataSource = new MatTableDataSource<any>(availableRelease);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  onDeleteRelease(order: any) {
    const dialogRef = this.dialog.open(ReleaseDeleteConfirmComponent, {
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseService.deleteRelease(order.id).subscribe((deleteResult) => {
          if (deleteResult.status === 'SUCCESS') {
            this.currentLength = this.releaseService.getReleaseLength(this.currentFilter);
            this.limit = 5;
            this.skip = 0;
            this.releaseService.getReleases(this.limit, this.skip, this.currentFilter).subscribe(data => {
              this.displayedColumns = ['position', 'name', 'weight', 'txtid', 'symbol', 'delete']
              const availableRelease = data;
              this.dataSource = new MatTableDataSource<any>(availableRelease);
              this.dataSource.paginator = this.paginator;
            })
          }
          else{
            this._snackBar.open(deleteResult.errorMessage,"dismiss",{
              horizontalPosition:"center",
              verticalPosition:"top",
              duration: 3000
            })
          }

        }, (error) => {
          console.error(`error: ${error}`);
          this._snackBar.open("create delete release failed", "dismiss", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000
          })
        })
      }
    });
  }

  onSearchRelease() {
    this.currentUserName = this.usernameControl.value;
    this.currentReocrdNumber = this.orderControl.value;
    if (this.currentUserName) {
      this.currentFilter = {
        ...this.currentFilter,
        username: this.currentUserName,
      }
    }
    else {
      delete this.currentFilter['username']
    }

    if (this.currentReocrdNumber) {
      this.currentFilter = {
        ...this.currentFilter,
        recordNumber: this.currentReocrdNumber,
      }
    }
    else {
      delete this.currentFilter['recordNumber']
    }

    this.limit = 5;
    this.skip = 0;
    this.currentLength = this.releaseService.getReleaseLength(this.currentFilter);
    this.releaseService.getReleases(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'txtid', 'symbol', 'delete']
      const availableRelease = data;
      this.dataSource = new MatTableDataSource<any>(availableRelease);
      this.dataSource.paginator = this.paginator;
    })
  }

}
