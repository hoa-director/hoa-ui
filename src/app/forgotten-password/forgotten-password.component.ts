// import { Location } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgotten-password",
  templateUrl: "./forgotten-password.component.html",
  styleUrls: ["./forgotten-password.component.css"],
})
export class ForgottenPasswordComponent implements OnInit {
  public password: string = "";
  public token: string = "";
  public message: string = "";
  public isSuccess: boolean = false;
  public noSuccess: boolean = false

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
  }

  changePassword(password) {
    this.userService
      .changeForgottenPassword({
        password,
        token: this.token,
      })
      .subscribe(
        (response) => {
          this.isSuccess = true;
          this.message = "Your password has been changed. Please login with you new password";
          setTimeout(() => {this.router.navigate(["/login"])}, 5000);
        },
        (error) => {
          this.noSuccess = true;
          this.message = "There was a server error. Please try again later";
        }
      );
  }
}
