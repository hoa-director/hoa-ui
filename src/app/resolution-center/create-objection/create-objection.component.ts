import { Component, OnInit } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

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
    private userService: UserService
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
    });
  }

  public submit(objection) {
    console.log('SUBMIT:', objection);
    this.resolutionCenterService
      .submitObjection(objection)
      .subscribe((response) => {});
  }

  onSubmit() {
    var objection = {
      against: this.againstControl.value,
      comment: this.commentControl.value,
    };
    // this.resetForm();
    this.resolutionCenterService
      .submitObjection(objection)
      .subscribe((response) => {});
  }

  onCancel() {
    this.resetForm();
  }

  private resetForm() {
    this.createObjectionForm.reset();
    this.createObjectionForm.markAsPristine();
    this.createObjectionForm.markAsUntouched();
  }
}
