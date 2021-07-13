import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { UserManagementService } from '../../user-management/user-management.service';
import { TransferService } from '../transfer.service';

interface User {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-transfer-create',
  templateUrl: './transfer-create.component.html',
  styleUrls: ['./transfer-create.component.scss']
})
export class TransferCreateComponent implements OnInit {

  public foods: User[];
  public currentAmount: number;
  public selectedSenderUser: any;
  public selectedReceiverUser: any;
  public userList: any
  public senderUsernameControl = new FormControl();
  public receiverUsernameControl = new FormControl();
  public filteredSenderUsernameOptions$: Observable<string[]>;
  public filteredReceiverUsernameOptions$: Observable<string[]>;

  constructor(private tranferService: TransferService, public dialogRef: MatDialogRef<TransferCreateComponent>,private _snackBar: MatSnackBar,private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.filteredSenderUsernameOptions$ = this.senderUsernameControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('username', searchTerm)),
    );

    this.filteredReceiverUsernameOptions$ = this.receiverUsernameControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('username', searchTerm)),
    );
  }

  onConfirmClick() {
    this.selectedSenderUser = this.senderUsernameControl.value;
    this.selectedReceiverUser = this.receiverUsernameControl.value;
    this.tranferService.createTransfer({
      sender: this.selectedSenderUser,
      receiver: this.selectedReceiverUser,
      amount: this.currentAmount,
    }).subscribe((result) => {
      if (result.data && result.status === 'SUCCESS') {
        this.dialogRef.close();
      }
      else{
        this._snackBar.open(result.errorMessage,"dismiss",{
          horizontalPosition:"center",
          verticalPosition:"top",
          duration: 3000
        })
      }
    }, (error) => {
      console.error(`error: ${error}`);
      this._snackBar.open("create new release failed","dismiss",{
        horizontalPosition:"center",
        verticalPosition:"top",
        duration: 3000
      })
    })

  }

}
