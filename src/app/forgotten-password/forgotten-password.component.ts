// import { Location } from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { UserService } from "../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subscription } from 'rxjs';
import { response } from 'express';

@Component({
  selector: "app-forgotten-password",
  templateUrl: "./forgotten-password.component.html",
  styleUrls: ["./forgotten-password.component.css"],
})
export class ForgottenPasswordComponent implements OnInit, OnDestroy {
  public token: string = "";
  private responseMessageSubject = new BehaviorSubject<string>(null);
  private messageSubs: Subscription;
  public message: string;
  public isSuccess: boolean = false;
  public noSuccess: boolean = false

  resetPassword = new FormGroup({
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    this.messageSubs = this.responseMessageSubject.subscribe(
      (response) => {
        this.message = response
      }
    );
  }

  ngOnDestroy(){
    this.messageSubs.unsubscribe();
  }

  onCancel() {
    this.resetPassword.reset();
    this.router.navigate(["/login"]);
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
          this.responseMessageSubject.next("Your password has been changed. Please login with you new password. You will be brought to the login page shortly...");
          setTimeout(() => {this.router.navigate(["/login"])}, 5000);
        },
        (error) => {
          this.noSuccess = true;
          this.responseMessageSubject.next("There was a server error. Please try again later");
        }
      );
  }
}
