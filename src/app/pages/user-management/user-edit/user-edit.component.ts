import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public YesNoOptions = [
    { text: 'Yes', value: true },
    { text: 'No', value: false }
  ];

  ngOnInit(): void {
  }

  constructor(
    private userManagementService: UserManagementService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    console.log('onNoClick');
    this.dialogRef.close();
  }

  onOkClick(): void {
    console.log('onOkClick');
    this.userManagementService.patch(this.data).subscribe(value => {
      this.dialogRef.close(value);
    });
  }

}
