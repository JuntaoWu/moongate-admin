import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatIconModule } from '@angular/material/icon'
import { NbIconModule } from '@nebular/theme';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserManagementComponent, UserEditComponent, UserCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    NbIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class UserManagementModule { }
