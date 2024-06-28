import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UsersCenterComponent } from './users-center.component';
import { UsersComponent } from './users-view/users.component';

import { UsersService } from 'app/services/users.service';
import { MatRadioModule } from '@angular/material/radio';
// import { TestComponentComponent } from '../test-component/test-component.component';



export const UsersCenterRoutes: Routes = [
  {
    path: "users-center",
    component: UsersCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "home/users-center/users",
        pathMatch: "full",
      },
      { path: "users", component: UsersComponent },
      // { path: "test", component: TestComponentComponent },
    ]
  }
]


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
    MatInputModule
  ],
  declarations: [
    UsersCenterComponent,
    UsersComponent,
    // TestComponentComponent
  ],
  providers: [UsersService]
})
export class UsersCenterModule { }
