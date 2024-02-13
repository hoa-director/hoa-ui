import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ModalModule } from "angular-custom-modal";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

import { AppRoutingModule } from "./app-routing.module";
import { ResolutionCenterModule } from "./resolution-center/resolution-center.module";

import { BoardComponent } from "./app/board/board.component";
import { DirectoryComponent } from "./app/directory/directory.component";
import { DocumentsComponent } from "./app/documents/documents.component";
import { ExteriorComponent } from "./app/exterior/exterior.component";
import { FinancialsComponent } from "./app/financials/financials.component";
import { InteriorComponent } from "./app/interior/interior.component";
import { MessageComponent } from "./app/message/message.component";
import { NotesComponent } from "./app/notes/notes.component";
import { ProfileComponent } from "./app/profile/profile.component";
import { RulesComponent } from "./app/rules/rules.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ForgottenPasswordComponent } from "./forgotten-password/forgotten-password.component";
import { RequestPasswordChangeComponent } from "./request-password-change/request-password-change.component";
import { AuthInterceptor } from "./services/auth-interceptor";
import { DialogComponent } from "./app/dialog/dialog.component";

import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import {
  MatLegacyRadioModule as MatRadioModule,
  MAT_LEGACY_RADIO_DEFAULT_OPTIONS as MAT_RADIO_DEFAULT_OPTIONS,
} from "@angular/material/legacy-radio";

// added with angular material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

import { FlexLayoutModule } from "@angular/flex-layout";

import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AssociationSwitchComponent } from "./association-switch/association-switch.component";
import { HomeComponent } from "./home/home.component";
import { PhonePipe } from "./phone.pipe";
import { BackFabComponent } from "./back-fab/back-fab.component";
import { NavBackDirective } from "./nav-back.directive";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LandingPageComponent,
        DirectoryComponent,
        RulesComponent,
        FinancialsComponent,
        DocumentsComponent,
        ExteriorComponent,
        InteriorComponent,
        BoardComponent,
        NotesComponent,
        ProfileComponent,
        MessageComponent,
        ForgottenPasswordComponent,
        RequestPasswordChangeComponent,
        DialogComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        AssociationSwitchComponent,
        HomeComponent,
        PhonePipe,
        BackFabComponent,
        NavBackDirective,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ModalModule,
        ResolutionCenterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        MatPasswordStrengthModule.forRoot(),
        FlexLayoutModule,
        CommonModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatMenuModule,
        MatRadioModule,
    ],
    providers: [
        // provides the interceptor
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: "accent" } },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
