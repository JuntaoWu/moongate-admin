import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDeleteConfirmComponent } from './order-delete-confirm/order-delete-confirm.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormControl } from '@angular/forms';
import { UserManagementService } from '../user-management/user-management.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
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

  constructor(private orderService: OrderService, public dialog: MatDialog, private _snackBar: MatSnackBar,private userManagementService: UserManagementService) {
    this.currentFilter = {
      "status": "ACTIVE",
      "orderType": "PURCHASE"
    }
    this.limit = 5;
    this.skip = 0;
  }
  ngAfterViewInit() {

  }
  ngOnInit(): void {
    this.currentLength = this.orderService.getOrderLength(this.currentFilter);
    this.orderService.getOrders(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'delete']
      const availableOrder = data;
      this.dataSource = new MatTableDataSource<any>(availableOrder);
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
      switchMap(searchTerm => this.orderService.search('recordNumber', searchTerm)),
    )

  }

  changePage(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.limit = limit;
    this.skip = skip;
    this.currentLength = this.orderService.getOrderLength(this.currentFilter);
    this.orderService.getOrders(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'delete']
      const availableOrder = data;
      this.dataSource = new MatTableDataSource<any>(availableOrder);
    })
  }

  onNewOrder() {
    const dialogRef = this.dialog.open(OrderCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentLength = this.orderService.getOrderLength(this.currentFilter);
      this.limit = 5;
      this.skip = 0;
      this.orderService.getOrders(this.limit, this.skip, this.currentFilter).subscribe(data => {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'delete']
        const availableOrder = data;
        this.dataSource = new MatTableDataSource<any>(availableOrder);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  onDeleteOrder(order: any) {
    const dialogRef = this.dialog.open(OrderDeleteConfirmComponent, {
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(order.id).subscribe((deleteResult) => {
          if (deleteResult.status === 'SUCCESS') {
            this.currentLength = this.orderService.getOrderLength(this.currentFilter);
            this.limit = 5;
            this.skip = 0;
            this.orderService.getOrders(this.limit, this.skip, this.currentFilter).subscribe(data => {
              this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'delete']
              const availableOrder = data;
              this.dataSource = new MatTableDataSource<any>(availableOrder);
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
          this._snackBar.open("create delete order failed", "dismiss", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000
          })
        })
      }
    });
  }

  onSearchOrder() {
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
    this.currentLength = this.orderService.getOrderLength(this.currentFilter);
    this.orderService.getOrders(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'delete']
      const availableOrder = data;
      this.dataSource = new MatTableDataSource<any>(availableOrder);
      this.dataSource.paginator = this.paginator;
    })
  }

}

