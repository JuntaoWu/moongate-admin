import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'ngx-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public YesNoOptions = [
    { text: 'Yes', value: true },
    { text: 'No', value: false }
  ];

  public data: any = {
    
  };

  ngOnInit(): void {
  }

  constructor(
    private userManagementService: UserManagementService,
    public dialogRef: MatDialogRef<UserEditComponent>) {
  }

  onNoClick(): void {
    console.log('onNoClick');
    this.dialogRef.close();
  }

  onOkClick(): void {
    console.log('onOkClick');
    this.userManagementService.post(this.data).subscribe(value => {
      this.dialogRef.close(value);
    });
  }

}
