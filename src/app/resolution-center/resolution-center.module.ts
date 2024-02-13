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

import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";

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
