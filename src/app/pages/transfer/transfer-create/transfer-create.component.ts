import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private tranferService: TransferService, public dialogRef: MatDialogRef<TransferCreateComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tranferService.getUserList({ locked: false }).subscribe(data => {
      this.userList = data.map((m) => {
        return {
          value: m.username,
          viewValue: m.username
        }
      })
    })
  }

  onConfirmClick() {
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
