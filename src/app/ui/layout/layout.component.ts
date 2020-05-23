import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit, OnDestroy {
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
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
