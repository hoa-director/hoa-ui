import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CreateObjectionComponent } from "./create-objection/create-objection.component";
import { InboxComponent } from "./inbox/inbox.component";
import { ObjectionComponent } from "./objection/objection.component";
import { ResolutionCenterComponent } from "./resolution-center.component";

import { OutboxComponent } from "./outbox/outbox.component";
import { ResolutionCenterService } from "./resolution-center.service";
import { PastObjectionsComponent } from "./past-objections/past-objections.component";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";

import { MatTabsModule } from "@angular/material/tabs";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const ResolutionCenterRoutes: Routes = [
  {
    path: "resolution-center",
    component: ResolutionCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", redirectTo: "main/resolution-center/inbox", pathMatch: "full" },
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
    BrowserAnimationsModule
  ],
  declarations: [
    ResolutionCenterComponent,
    InboxComponent,
    ObjectionComponent,
    CreateObjectionComponent,
    OutboxComponent,
    PastObjectionsComponent,
  ],
  providers: [ResolutionCenterService],
})
export class ResolutionCenterModule {}
