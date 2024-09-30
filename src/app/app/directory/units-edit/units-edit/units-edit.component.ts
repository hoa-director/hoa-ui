import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../../../services/user.service";
import { DataService } from "app/services/data.service";
import { ActivatedRoute } from '@angular/router';
// -- models
import { Unit } from "../../unit.model";
// -- css & Components
import { isLoading } from "../../../../shared/isLoading";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SuccessModalComponent } from "app/app/success-modal/success-modal.component";
import { FailureModalComponent } from "app/app/failure-modal/failure-modal.component";

@Component({
  selector: 'app-units-edit',
  templateUrl: './units-edit.component.html',
  styleUrls: ['./units-edit.component.css']
})
export class UnitsEditComponent {
  unitId: number; // pass unit ID in here
  currentUnit: Unit;
  editUnitForm: FormGroup;
  allUnits: any;
  availableUsers: any;
  isLoading = false;
  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
  ];

constructor(
  private dataService: DataService,
  private fb: FormBuilder,
  private dialog: MatDialog,
  private route: ActivatedRoute
) {}

// -- PAGE LOAD
ngOnInit() {
  // this.listenForEvents();
  this.getParams();
  this.initEditUnitForm();
  this.getAllUnits();
  this.getAvailableUsers();

  this.editUnitForm.get('unitId')?.valueChanges.subscribe(value => { // -- Listen for Unit Dropdown selection changes
    console.log('this.unitId', this.unitId);
    this.unitId = value;
    this.getUnit(this.unitId) 
  });
}

// --  GET ALL UNITS DROPDOWN -- //
getAllUnits(){
    isLoading(true);
    this.dataService.fetchUnits('')
    .subscribe((responseData: any) => {
      console.log('RESPONSE.DATA:', responseData);
      this.allUnits = [...responseData];
      console.log('this.allUnits:', this.allUnits);
      // this.cdr.detectChanges();
    }).add(() => {
      isLoading(false);
    });
}

// --  GET AVAILABLE USERS DROPDOWN -- //
getAvailableUsers(){
  console.log('getAvailableUsers');
    isLoading(true);
    this.dataService.getAvailableUsers()
    .subscribe((responseData: any) => {
      console.log('RESPONSE.DATA:', responseData);
      this.availableUsers = [...responseData];
      console.log('AVAILABLE USERS:', this.availableUsers);
      // this.cdr.detectChanges();
    }).add(() => {
      isLoading(false);
    });
}

// -- GET PARAMS (IF THEY EXIST)
getParams(){
  this.route.paramMap.subscribe(params => {
    this.unitId = +params.get('unitId'); // Convert to number
    if (this.unitId) {
      this.getUnit(this.unitId)
    }
  });
}

// -- INIT EDIT FORM
initEditUnitForm() {
  this.editUnitForm = this.fb.group({
    unitId: [{value: this.unitId, disabled: false}, [Validators.required]], 
    associationId: [{value: this.associations[0].id, disabled: true}, [Validators.required]], // required. Add get association
    addressLineOne: [''],
    addressLineTwo: [''],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    user: [''], 
    // availableUsers: [{value: this.availableUsers}],  --  turned off for testing
  });
}

// -- GET UNIT
getUnit(unitId: number) {
  console.log('this.UnitId', unitId);
  isLoading(true);
  this.dataService.fetchOneUnit(unitId)
  .subscribe((responseData: any) => {
    console.log('RESPONSE.DATA:', responseData);
    this.currentUnit = responseData;
    console.log('this.currentUnit after API:', this.currentUnit);
    if (this.currentUnit){
      this.updateEditUnitForm(this.currentUnit)
    }
  }).add(() => {
    isLoading(false);
  });
}
// -- UPDATE EDIT FORM
updateEditUnitForm(unit: any) {
  this.editUnitForm.patchValue({
    addressLineOne: unit.addressLineOne || '',
    addressLineTwo: unit.addressLineTwo || '',
    city: unit.city || '',
    state: unit.state || '',
    zip: unit.zip || '',
    user: unit.user || ''
  });
}


// -- SUBMIT UNIT CHANGES
saveUnitChanges(){
  console.log('Save Unit Changes!');
  console.log('this.currentUnit', this.currentUnit);
  // this.getUnit(this.unitId)

  if(this.editUnitForm.valid){
    const formValues = this.editUnitForm.value
    console.log('formValues.userId:', formValues.userId,);
    const unitObj = {
      unitId: formValues.unitId,
      // associationId: formValues.associationId, //  don't send for now. 
      addressLineOne: formValues.addressLineOne,
      addressLineTwo: formValues.addressLineTwo,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      user: formValues.user,
    } 
    this.dataService
    .updateUnit(unitObj)
    .subscribe(
      (responseData: any) => {
        console.log('response subscribe');
        if (responseData.status === 'success') {
          console.log('RESPONSE:', responseData);
          this.openSuccessModal(); // -- need to import to use
        } else if (responseData.status === 'failure') {
          console.log('RESPONSE', responseData);
          this.openFailureModal('User update failed.'); // Handle failure
        }
      }
    );
  }
}

// -- CANCEL
onReset(): void {
  console.log('CANCEL');
  // this.editUnitForm.reset({
  //   associationId: this.associations[0].id, // required
  //   addressLineOne: '',
  //   // addressLineTwo: '',
  //   // city: '',
  //   // state: '',
  //   // zip: '',
  //   user: '', // required
  // });
}

openSuccessModal() {
  this.dialog.open(SuccessModalComponent, {
    data: { message: "User was updated successfully." }
  });
}

openFailureModal(message) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}

}
