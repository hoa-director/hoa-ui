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
import { DirectoryComponent } from './directory.component';
import { UnitsViewComponent } from './units-view/units-view.component';
import { UnitsAddComponent } from './units-add/units-add.component';
// -- services 
import { UsersCenterService } from 'app/services/users-center.service';
import { MatCardModule } from '@angular/material/card';
import { ModalModule } from 'angular-custom-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UnitsEditComponent } from './units-edit/units-edit/units-edit.component';
import { UnitsEditOwnComponent } from './units-edit/units-edit-own/units-edit-own.component';


export const DirectoryRoutes: Routes = [
  {
    path: "directory",
    component: DirectoryComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
    children: [
      { path: "view", component: UnitsViewComponent },
      { path: "add", component: UnitsAddComponent },
      { path: "edit/:unitId", component: UnitsEditComponent },
      { path: "update-phone", component: UnitsEditOwnComponent },
    ],
  },
]
@NgModule({
  declarations: [
    DirectoryComponent,
    UnitsViewComponent, 
    UnitsAddComponent, 
    UnitsEditComponent, // Delete Unit is in Edit Page
    UnitsEditOwnComponent,
  ],
  imports: [
    RouterModule.forChild(DirectoryRoutes),
    CommonModule,
    ModalModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [UsersCenterService]
})
export class DirectoryModule { }
