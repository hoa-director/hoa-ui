import { Routes } from '@angular/router';

import { BoardComponent } from './app/board/board.component';
import { DirectoryComponent } from './app/directory/directory.component';
import { DocumentsComponent } from './app/documents/documents.component';
import { ExteriorComponent } from './app/exterior/exterior.component';
import { FinancialsComponent } from './app/financials/financials.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { InteriorComponent } from './app/interior/interior.component';
import { MessageComponent } from './app/message/message.component';
import { NotesComponent } from './app/notes/notes.component';
import { ProfileComponent } from './app/profile/profile.component';
import { RequestPasswordChangeComponent } from './request-password-change/request-password-change.component';
import { RulesComponent } from './app/rules/rules.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';

import { ResolutionCenterRoutes } from "../app/resolution-center/resolution-center.module";
import { componentFactoryName } from '@angular/compiler';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: LoginComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'reset-password',
    component: RequestPasswordChangeComponent ,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'forgotten-password/:token',
    component: ForgottenPasswordComponent ,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'home',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'directory',
        component: DirectoryComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'rules',
        component: RulesComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'messages',
        component: MessageComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'financials',
        component: FinancialsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'exterior',
        component: ExteriorComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'interior',
        component: InteriorComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'board',
        component: BoardComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'notes',
        component: NotesComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      ...ResolutionCenterRoutes,
    ] 
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  }
];
