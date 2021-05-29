import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listenForEvents();
    this.userService.autoAuthenticateUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
