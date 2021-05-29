import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
