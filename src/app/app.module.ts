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

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
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
import { UnitModalComponent } from "./app/modal/unit-modal/unit-modal.component";
import { TestComponentComponent } from './app/test-component/test-component.component';
import { UsersCenterModule } from "./app/users-center/users-center.module";
import { SuccessModalComponent } from './app/success-modal/success-modal.component';
import { DirectoryModule } from "./app/directory/directory.module";
import { FailureModalComponent } from './app/failure-modal/failure-modal.component';
// import { UsersComponent } from './app/users-center/users-view/users.component';
// import { UsersCenterComponent } from './app/users-center/users-center.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LandingPageComponent,
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
        UnitModalComponent,
        TestComponentComponent,
        SuccessModalComponent,
        FailureModalComponent,
        // DirectoryComponent, // -- Moved to the directory module.
        // UsersComponent,  // -- Moved to the user-center module.
        // UsersCenterComponent,  // -- Moved to the user-center module.
    ],
    imports: [
        RouterModule,
        CommonModule,
        ModalModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
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
        FormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSelectModule,
        MatFormFieldModule,
        MatMenuModule,
        MatRadioModule,
        DirectoryModule,
        ResolutionCenterModule,
        UsersCenterModule,
    ],
    providers: [
        // provides the interceptor
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: "accent" } },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
