import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/services/auth-guard.service';
// -- css elements
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// -- components
import { UsersCenterComponent } from './users-center.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersAddComponent } from './users-add/users-add.component';
// -- services 
import { UsersCenterService } from 'app/services/users-center.service';
import { UsersEditComponent } from './users-edit/users-edit/users-edit.component';



export const UsersCenterRoutes: Routes = [
  {
    path: "users-center",
    component: UsersCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "home/users-center/users-view",
        pathMatch: "full",
      },
      { path: "users-view", component: UsersViewComponent },
      { path: "users-add", component: UsersAddComponent },
      { path: "users-edit", component: UsersEditComponent },
    ],
  },
];


@NgModule({
  
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(UsersCenterRoutes),
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    UsersCenterComponent,
    UsersViewComponent,
    UsersAddComponent,
    UsersEditComponent,
  ],
  providers: [UsersCenterService],
})
export class UsersCenterModule { }
