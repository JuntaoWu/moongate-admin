import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-release-delete-confirm',
  templateUrl: './release-delete-confirm.component.html',
  styleUrls: ['./release-delete-confirm.component.scss']
})
export class ReleaseDeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReleaseDeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
