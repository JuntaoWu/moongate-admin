import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagementService } from '../../user-management/user-management.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

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
  // autocomplete
  public usernameControl = new FormControl();
  public filteredUsernameOptions$: Observable<string[]>;
  
  constructor(private orderService: OrderService, public dialogRef: MatDialogRef<OrderCreateComponent>,private _snackBar: MatSnackBar,private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    /*this.foods = [
      { value: 'steak-0', viewValue: 'Steak' },
      { value: 'pizza-1', viewValue: 'Pizza' },
      { value: 'tacos-2', viewValue: 'Tacos' }
    ];*/

    this.filteredUsernameOptions$ = this.usernameControl.valueChanges.pipe(
      filter(searchTerm => searchTerm?.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(searchTerm => this.userManagementService.search('username', searchTerm)),
    );
  }

  onConfirmClick() {
    this.selectedUser = this.usernameControl.value;
    this.orderService.createOrder({
      username: this.selectedUser,
      amount: this.currentAmount,
      orderType: "PURCHASE"
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
      this._snackBar.open("create new order failed","dismiss",{
        horizontalPosition:"center",
        verticalPosition:"top",
        duration: 3000
      })
    })

  }

}
