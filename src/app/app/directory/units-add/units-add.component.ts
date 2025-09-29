import { Component, OnInit, OnDestroy } from "@angular/core";
// -- css
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
// import { isLoading } from "../../../shared/isLoading";
import { MatDialog } from "@angular/material/dialog";
// -- models
import { Unit } from ".././unit.model";
// -- components
import { UnitModalComponent } from "../../modal/unit-modal/unit-modal.component";
import { DataService } from "app/services/data.service";
import { Router } from '@angular/router';
import { SuccessModalComponent } from "app/app/success-modal/success-modal.component";
import { FailureModalComponent } from "app/app/failure-modal/failure-modal.component";

@Component({
  selector: "app-units-add",
  templateUrl: "./units-add.component.html",
  styleUrls: ["./units-add.component.css"],
})
export class UnitsAddComponent implements OnInit, OnDestroy {
  // newUnit: Unit[] = [];
  addUnitForm: FormGroup;
  availableUsers: any[] = [];
  associations: any[] = [];
  
  // isLoading = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getAvailableUsers().subscribe((response: any) => {
      this.availableUsers = response; // array of {id, firstName, lastName}
    });

    this.dataService.fetchNeighborhoods()
      .subscribe((response: any) => {
        this.associations = response;
      }, (error: any) => {
        console.log('Error fetching neighborhoods:', error);
      });

    this.addUnitForm = this.fb.group({
      associationId: ['', [Validators.required]],
      addressLineOne: ['', [Validators.required]],
      addressLineTwo: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      userId: [0]
    });
  }

  ngOnDestroy() {
    // this.userSubjectSubs.unsubscribe();
  }

  openUnitModal() {
    this.dialog.open(UnitModalComponent);
  }

  // -- BUG ------- THIS FIRES TWICE. ------------------------------------------------
  addUnit() {
    if (this.addUnitForm.valid) {
      // isLoading(true);
      // this.addUnitForm.get('associationId').enable(); 
      const formValues = this.addUnitForm.value;

      let unit: Unit = {
        // id: 10,
        // user_id: null,
        associationId: formValues.associationId,
        addressLineOne: formValues.addressLineOne,
        addressLineTwo: formValues.addressLineTwo,
        city: formValues.city,
        state: formValues.state,
        zip: formValues.zip,
        userId: formValues.userId === 0 ? null : formValues.userId
        // updatedAt: '2024-07-19 18:47:52.63-05',
        // createdAt: '2024-07-19 18:47:52.63-05',
      };
      // this.addUnitForm.get('associationId').disable(); 

      this.dataService
        .addUnit(unit)
        .subscribe(
          (responseData: any) => {
            if(responseData.status === 'success') {
              setTimeout(() => {
                this.openSuccessModal(); // -- tell user it worked
                this.onReset(); // -- clear form
                this.router.navigate(['/home/directory/view']);
              }, 500);
            } else if (responseData.status === 'failure') {
              this.openFailureModal(responseData.message); // -- tell user it did NOT work
            }
          },
          (error) => { // -- If Error
            this.openFailureModal('An error occurred when attempting to save a new unit: ' + error); // -- tell user it did NOT work
          }
        );
    } else { // -- If FORM NOT VALID
      return;
    }
    // isLoading(false);
  }

  onReset(): void {
    // console.log('CLEAR BTN');
    this.addUnitForm.reset({
      associationId: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zip: '',
      userId: 0
    });
  }

  onCancel(): void {
    this.onReset();
    this.router.navigate(['/home/directory/view']);
  }

  openSuccessModal() {
    this.dialog.open(SuccessModalComponent, {
      data: { message: 'Unit was created successfully.'}
    })
  }

  openFailureModal(message: string) {
    this.dialog.open(FailureModalComponent, {
      data: { message: message}
    })
  }

}
