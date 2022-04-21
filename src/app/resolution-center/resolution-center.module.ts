import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateObjectionComponent } from "./create-objection/create-objection.component";
import { InboxComponent } from "./inbox/inbox.component";
import { ObjectionComponent } from "./objection/objection.component";
import { ResolutionCenterComponent } from "./resolution-center.component";
import { OutboxComponent } from "./outbox/outbox.component";
import { ResolutionCenterService } from "./resolution-center.service";
import { PastObjectionsComponent } from "./past-objections/past-objections.component";
import { VoteDialogComponent } from "./vote-dialog/vote-dialog.component";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export const ResolutionCenterRoutes: Routes = [
  {
    path: "resolution-center",
    component: ResolutionCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "home/resolution-center/inbox",
        pathMatch: "full",
      },
      { path: "inbox", component: InboxComponent },
      { path: "outbox", component: OutboxComponent },
      { path: "past", component: PastObjectionsComponent },
      { path: "objection/create", component: CreateObjectionComponent },
      { path: "objection/view/:id", component: ObjectionComponent },
      { path: "objection/:id", component: ObjectionComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ResolutionCenterRoutes),
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
  ],
  declarations: [
    ResolutionCenterComponent,
    InboxComponent,
    ObjectionComponent,
    CreateObjectionComponent,
    OutboxComponent,
    PastObjectionsComponent,
    VoteDialogComponent,
  ],
  providers: [ResolutionCenterService],
})
export class ResolutionCenterModule {}
