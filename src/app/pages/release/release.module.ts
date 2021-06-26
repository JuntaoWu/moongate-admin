import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseComponent } from './release.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReleaseCreateComponent } from './release-create/release-create.component';
import { ReleaseDeleteConfirmComponent } from './release-delete-confirm/release-delete-confirm.component';



@NgModule({
  declarations: [ReleaseComponent,ReleaseCreateComponent, ReleaseDeleteConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class ReleaseModule { }
