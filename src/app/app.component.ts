import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  // public isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listenForEvents();
    this.userService.autoAuthenticateUser();

    // document.addEventListener("loading", this.setLoadingStatus.bind(this));
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

  // setLoadingStatus(loadingEvent: CustomEvent) {
  //   this.isLoading = loadingEvent.detail.isLoading;
  // }
}
