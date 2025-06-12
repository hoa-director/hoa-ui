import { Component, OnInit, OnDestroy } from "@angular/core";
// -- css
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { isLoading } from "../../../shared/isLoading";
import { MatDialog } from "@angular/material/dialog";
// -- models
import { Unit } from ".././unit.model";
// -- components
import { UnitModalComponent } from "../../modal/unit-modal/unit-modal.component";
import { DataService } from "app/services/data.service";
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

  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
  ];
  
  isLoading = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.listenForEvents();
    // console.log('this.associationId', this.associationId);
    this.addUnitForm = this.fb.group({
      associationId: [{value: this.associations[0].id, disabled: true}, [Validators.required]], // required. Add get association
      addressLineOne: ['', [Validators.required]],
      addressLineTwo: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      userId: ['']
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
    // console.log('ADD BTN');
    
    if (this.addUnitForm.valid) {
      isLoading(true);
      this.addUnitForm.get('associationId').enable(); 
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
        userId: formValues.userId
        // updatedAt: '2024-07-19 18:47:52.63-05',
        // createdAt: '2024-07-19 18:47:52.63-05',
      };
      this.addUnitForm.get('associationId').disable(); 
      console.log("formValues", formValues);

      this.dataService
        .addUnit(unit)
        .subscribe(
          (responseData: any) => {
            if(responseData.status === 'success'){ // -- If Response
              console.log("SUCCESS responseData:", responseData);
              setTimeout(() => {
                this.openSuccessModal(); // -- tell user it worked
                this.onReset(); // -- clear form
              }, 500);
            } else if (responseData.status === 'failure') { // -- If NO Response
              console.log('FAIL responseData:', responseData);
              this.openFailureModal('Unit already exists in that Organization.'); // -- tell user it did NOT work
            }
          },
          (error) => { // -- If Error
            this.openFailureModal('There was an error when trying to create a new unit.'); // -- tell user it did NOT work
            console.log("unit-add ERROR", error);
          }
        )
    } else { // -- If FORM NOT VALID
      console.log('ADD UNIT FORM NOT VALID');
    }
    isLoading(false);
  }

  onReset(): void {
    console.log('CLEAR BTN');
    this.addUnitForm.reset({
      // associationId: this.associations[0].id, // required
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zip: '',
      userId: ''
    });
  }

  openSuccessModal() {
    this.dialog.open(SuccessModalComponent, {
      data: { message: 'Unit was created successfully.'}
    })
  }

  openFailureModal(message) {
    this.dialog.open(FailureModalComponent, {
      data: { message: message}
    })
  }

}
