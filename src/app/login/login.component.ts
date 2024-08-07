import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: { email: string; password: string } = { email: "", password: "" };

  userAuthError: string = null;
  private authErrorSubs: Subscription;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listenForEvents();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.authErrorSubs.unsubscribe();
  }

  // -- Passive listener for any login
  listenForEvents() {
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        if (!isAuthenticated) return;
        this.userAuthError = null;
      });

    this.authErrorSubs = this.userService
      .getAuthErrorListener()
      .subscribe((authError: string) => {
        this.userAuthError = authError;
      });
  }

  // -- intentional login
  login(user): void {
    this.userService.loginUser(user);
  }
}
