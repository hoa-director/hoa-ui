import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: { email: string; password: string } = { email: '', password: '' };

  userAuthError: string = null;
  private authErrorSubs: Subscription;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.listenForEvents();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.authErrorSubs.unsubscribe();
  }

  listenForEvents() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if(!isAuthenticated) return;
        this.userAuthError = null;
        // this.router.navigateByUrl('/directory');
      }
    );

    this.authErrorSubs = this.userService.getAuthErrorListener().subscribe(
      authError => {
        this.userAuthError = authError;
      }
    );
  }

  login(user): void {
    this.userService.loginUser(user)
  }
}
