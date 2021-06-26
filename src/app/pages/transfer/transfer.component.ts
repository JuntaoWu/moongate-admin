import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TransferCreateComponent } from './transfer-create/transfer-create.component';
import { TransferDeleteConfirmComponent } from './transfer-delete-confirm/transfer-delete-confirm.component';
import { TransferService } from './transfer.service';

@Component({
  selector: 'ngx-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  public displayedColumns: any;
  public dataSource: any;
  public currentLength: Observable<number>
  public limit: number;
  public skip: number;
  public senderUserName: string;
  public receiverUserName: string;
  public reocrdNumber: string;
  public currentFilter: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private transferService: TransferService, public dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.currentFilter = {}
  }

  ngOnInit(): void {
    this.currentLength = this.transferService.getTransferLength(this.currentFilter);
    this.transferService.getTransfers(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['recordNumber', 'senderUserName', 'receiverUserName', 'amount','status', 'createDate','updateDate','delete']
      const availableTransfers = data;
      this.dataSource = new MatTableDataSource<any>(availableTransfers);
      this.dataSource.paginator = this.paginator;
    })
  }

  changePage(event: PageEvent) {
    const skip = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.limit = limit;
    this.skip = skip;
    this.currentLength = this.transferService.getTransferLength(this.currentFilter);
    this.transferService.getTransfers(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['recordNumber', 'senderUserName', 'receiverUserName', 'amount','status', 'createDate','updateDate','delete']
      const availableTransfers = data;
      this.dataSource = new MatTableDataSource<any>(availableTransfers);
    })
  }

  onNewTransfer() {
    const dialogRef = this.dialog.open(TransferCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.currentLength = this.transferService.getTransferLength(this.currentFilter);
      this.limit = 5;
      this.skip = 0;
      this.transferService.getTransfers(this.limit, this.skip, this.currentFilter).subscribe(data => {
        this.displayedColumns = ['recordNumber', 'senderUserName', 'receiverUserName', 'amount','status', 'createDate','updateDate','delete']
        const availableTransfers = data;
        this.dataSource = new MatTableDataSource<any>(availableTransfers);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  onDeleteTransfer(order: any) {
    const dialogRef = this.dialog.open(TransferDeleteConfirmComponent, {
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transferService.deleteTransfer(order.id).subscribe((deleteResult) => {
          if(deleteResult.status === 'SUCCESS'){
            this.currentLength = this.transferService.getTransferLength(this.currentFilter);
            this.limit = 5;
            this.skip = 0;
            this.transferService.getTransfers(this.limit, this.skip, this.currentFilter).subscribe(data => {
              this.displayedColumns = ['recordNumber', 'senderUserName', 'receiverUserName', 'amount','status', 'createDate','updateDate','delete']
              const availableTransfers = data;
              this.dataSource = new MatTableDataSource<any>(availableTransfers);
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

  onSearchTransfer() {
    if (this.senderUserName) {
      this.currentFilter = {
        ...this.currentFilter,
        sender: this.senderUserName,
      }
    }
    else {
      delete this.currentFilter['sender']
    }

    if (this.receiverUserName) {
      this.currentFilter = {
        ...this.currentFilter,
        receiver: this.receiverUserName,
      }
    }
    else {
      delete this.currentFilter['receiver']
    }

    if (this.reocrdNumber) {
      this.currentFilter = {
        ...this.currentFilter,
        recordNumber: this.reocrdNumber,
      }
    }
    else {
      delete this.currentFilter['recordNumber']
    }

    this.limit = 5;
    this.skip = 0;
    this.currentLength = this.transferService.getTransferLength(this.currentFilter);
    this.transferService.getTransfers(this.limit, this.skip, this.currentFilter).subscribe(data => {
      this.displayedColumns = ['recordNumber', 'senderUserName', 'receiverUserName', 'amount','status', 'createDate','updateDate','delete']
      const availableTransfers = data;
      this.dataSource = new MatTableDataSource<any>(availableTransfers);
      this.dataSource.paginator = this.paginator;
    })
  }

}
