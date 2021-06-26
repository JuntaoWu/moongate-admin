import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReleaseService } from '../release.service';


interface User {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'ngx-release-create',
  templateUrl: './release-create.component.html',
  styleUrls: ['./release-create.component.scss']
})
export class ReleaseCreateComponent implements OnInit {

  public foods: User[];
  public currentAmount: number;
  public selectedUser: any;
  public currentTxId: string;
  public userList: any
  constructor(private releaseService: ReleaseService, public dialogRef: MatDialogRef<ReleaseCreateComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.releaseService.getUserList({ locked: false }).subscribe(data => {
      this.userList = data.map((m) => {
        return {
          value: m.username,
          viewValue: m.username
        }
      })
    })
  }

  onConfirmClick() {
    this.releaseService.createRelease({
      username: this.selectedUser,
      amount: this.currentAmount,
      txid: this.currentTxId,
      orderType: "RELEASE"
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
