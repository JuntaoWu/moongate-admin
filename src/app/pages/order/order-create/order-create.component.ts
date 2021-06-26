import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  public foods: User[];
  public currentAmount: number;
  public selectedUser: any;
  public userList: any
  constructor(private orderService: OrderService, public dialogRef: MatDialogRef<OrderCreateComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    /*this.foods = [
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos' }
    ];*/

    this.orderService.getUserList({ locked: false }).subscribe(data => {
      this.userList = data.map((m) => {
        return {
          value: m.username,
          viewValue: m.username
        }
      })
    })
  }

  onConfirmClick() {
    console.log("currentAmount" + this.currentAmount);
    console.log("selectedUser" + this.selectedUser);
    this.orderService.createOrder({
      username: this.selectedUser,
      amount: this.currentAmount,
      orderType: "PURCHASE"
    }).subscribe((result) => {
      if (result.data && result.status === 'SUCCESS') {
        this.dialogRef.close();
      }
    }, (error) => {
      console.error(`error: ${error}`);
      this._snackBar.open("create new order failed","dismiss",{
        horizontalPosition:"center",
        verticalPosition:"top",
        duration: 3000
      })
    })

  }

}
