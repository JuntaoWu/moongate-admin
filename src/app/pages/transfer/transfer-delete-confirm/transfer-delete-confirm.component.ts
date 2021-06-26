import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-transfer-delete-confirm',
  templateUrl: './transfer-delete-confirm.component.html',
  styleUrls: ['./transfer-delete-confirm.component.scss']
})
export class TransferDeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TransferDeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
