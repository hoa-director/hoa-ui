import { Component, OnInit } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-create-objection",
  templateUrl: "./create-objection.component.html",
  styleUrls: ["./create-objection.component.css"],
})
export class CreateObjectionComponent implements OnInit {
  units: any[];

  createObjectionForm = new UntypedFormGroup({
    againstControl: new UntypedFormControl(null, Validators.required),
    commentControl: new UntypedFormControl("", Validators.required),
  });

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    private userService: UserService,
    private router: Router,
  ) {}

  get againstControl() {
    return this.createObjectionForm.get("againstControl");
  }

  get commentControl() {
    return this.createObjectionForm.get("commentControl");
  }

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

  private init() {
    this.resolutionCenterService.getUnits().subscribe((response) => {
      this.units = response.units;
      console.log('this.units:', this.units);
    });
  }

  onSubmit() {
    // -- Everything we are passing to the backend
    var objection = {
      organizationId: sessionStorage.getItem("associationId"),
      against: this.againstControl.value,
      comment: this.commentControl.value,
    };

    this.resolutionCenterService
      .submitObjection(objection)
      .subscribe((response) => {
        this.resetForm();
        this.router.navigate(['/home/resolution-center/open']);
      });
  }

  onCancel() {
    this.resetForm();
    this.router.navigate(['/home/resolution-center/open']);
  }

  private resetForm() {
    this.createObjectionForm.reset();
    this.createObjectionForm.markAsPristine();
    this.createObjectionForm.markAsUntouched();
  }
}
