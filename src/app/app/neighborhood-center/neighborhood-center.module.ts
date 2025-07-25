import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/services/auth-guard.service';
// -- css elements
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// -- components
import { NeighborhoodCenterComponent } from './neighborhood-center.component';
import { NeighborhoodViewComponent } from './neighborhood-view/neighborhood-view.component';
import { NeighborhoodAddComponent } from './neighborhood-add/neighborhood-add.component';
import { NeighborhoodEditComponent } from './neighborhood-edit/neighborhood-edit.component';
// -- services 
import { NeighborhoodCenterService } from 'app/services/neighborhood-center.service';
import { NeighborhoodEditComponent } from './neighborhood-edit/neighborhood-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


export const NeighborhoodCenterRoutes: Routes = [
  {
    path: "neighborhood-center",
    component: NeighborhoodCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "home/neighborhood-center/neighborhood-view",
        pathMatch: "full",
      },
      { path: "neighborhood-view", component: NeighborhoodViewComponent },
      { path: "neighborhood-add", component: NeighborhoodAddComponent },
      { path: "neighborhood-edit/:associationId", component: NeighborhoodEditComponent },
    ],
  },
];


@NgModule({
  
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(NeighborhoodCenterRoutes),
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
    MatSlideToggleModule,
  ],
  declarations: [
    NeighborhoodCenterComponent,
    NeighborhoodViewComponent,
    NeighborhoodAddComponent,
    NeighborhoodEditComponent,
  ],
  providers: [NeighborhoodCenterService],
})
export class NeighborhoodCenterModule { }
