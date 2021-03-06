import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-request-password-change",
  templateUrl: "./request-password-change.component.html",
  styleUrls: ["./request-password-change.component.css"],
})
export class RequestPasswordChangeComponent implements OnInit {
  requestPasswordChange = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  message: string = "";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    // this.requestToken(event;
    this.requestToken(this.requestPasswordChange.get("email").value);
  }

  onCancel() {
    this.requestPasswordChange.reset();
    this.router.navigate(["/login"]);
  }

  requestToken(email: string) {
    this.userService.requestToken(email).subscribe(
      (response) => {
        this.message = `An email will be sent to ${email} with a link to reset your password`;
        this.requestPasswordChange.disable();
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 5000);
      },
      (error) => {
        this.message = `We couldn\'t find an account associated with ${email}`;
      }
    );
  }
}
