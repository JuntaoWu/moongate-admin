import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { OrderComponent } from './order.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule
  ]
})
export class OrderModule { }
