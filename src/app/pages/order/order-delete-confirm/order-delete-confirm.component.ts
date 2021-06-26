import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-order-delete-confirm',
  templateUrl: './order-delete-confirm.component.html',
  styleUrls: ['./order-delete-confirm.component.scss']
})
export class OrderDeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderDeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {

  }
  onConfirmClick() {
    this.dialogRef.close();
  }
}
