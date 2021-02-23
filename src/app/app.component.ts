import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Subscription } from "rxjs";
import { SpinnerService } from "./services/spinner.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [SpinnerService]
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isLoading = false;

  constructor(
    private userService: UserService,
    private spinner: SpinnerService
  ) {}

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

    this.spinner
      .getLoadingStatusListener()
      .subscribe((loadingStatus: boolean) => {
        this.isLoading = loadingStatus;
      });
  }
}
