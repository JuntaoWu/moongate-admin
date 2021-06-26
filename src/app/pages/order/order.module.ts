import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { OrderComponent } from './order.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { OrderDeleteConfirmComponent } from './order-delete-confirm/order-delete-confirm.component';
import { MatDialogModule,MatDialogClose } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'



@NgModule({
  declarations: [OrderComponent, OrderDeleteConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class OrderModule { }
