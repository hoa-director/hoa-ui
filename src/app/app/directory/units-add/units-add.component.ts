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
      user: [''], // required
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
    console.log('ADD BTN');
    
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
        // updatedAt: '2024-07-19 18:47:52.63-05',
        // createdAt: '2024-07-19 18:47:52.63-05',
      };
      this.addUnitForm.get('associationId').disable(); 
      console.log("formValues", formValues);
      console.log("formValues.associationId", formValues.associationId);

      this.dataService
        .addUnit(unit)
        .subscribe(
          (responseData: any) => {
            console.log("responseData", responseData);
            return responseData;
          },
          (error) => {
            console.log("unit-add ERROR", error);
          }
        )
        .add(() => {
          setTimeout(() => {
            isLoading(false);
          }, 500);
        });
    } else {
      console.log('ADD UNIT FORM NOT VALID');
    }

  }

  onReset(): void {
    console.log('CLEAR BTN');
    this.addUnitForm.reset({
      associationId: this.associations[0].id, // required
      addressLineOne: [""],
      addressLineTwo: [""],
      city: [""],
      state: [""],
      zip: [""],
      user: [""], // required
    });
  }

}
