import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription} from 'rxjs';
import { is } from 'bluebird';
import { isatty } from 'tty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;
  private loadingListenerSubs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listenForEvents();
    this.userService.autoAuthenticateUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.loadingListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

    this.loadingListenerSubs = this.userService.getLoadingStatusListener().subscribe(
      loadingStatus => {
        this.isLoading = loadingStatus;
      }
    )
  }
}
