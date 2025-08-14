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
import { NeighborhoodCenterComponent } from './app/neighborhood-center/neighborhood-center.component';

import { HomeComponent } from './home/home.component';

// --  Import children Routes --
import { ResolutionCenterRoutes } from "../app/resolution-center/resolution-center.module";
import { UsersCenterRoutes } from './app/users-center/users-center.module';
import { DirectoryRoutes } from './app/directory/directory.module';
import { NeighborhoodCenterRoutes } from './app/neighborhood-center/neighborhood-center.module';

import { UnitModalComponent } from './app/modal/unit-modal/unit-modal.component';

// -- import children Components --
import { UsersCenterComponent } from './app/users-center/users-center.component';
import { TestComponentComponent } from './app/test-component/test-component.component';

export const routes: Routes = [
  // -- ULR ROUTE LEVEL 1 -- //
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
        // -- ULR ROUTE LEVEL 2 (CHILDREN OF "home") -- //
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
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'users-center',
        component: UsersCenterComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'neighborhood-center',
        component: NeighborhoodCenterComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
      },
      ...ResolutionCenterRoutes,
      ...UsersCenterRoutes,
      ...DirectoryRoutes,
      ...NeighborhoodCenterRoutes,
    ]
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  }
];
