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
  currentUnit: any; //Unit;
  editUnitForm: FormGroup;
  allUnits: any;
  availableUsers: any;
  isLoading = false;
  formIsDisabled: boolean = false
  unitStatus: boolean = false; 
  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
  ];
  allUnitStatuses = [
    { id: 0, name: 'Inactive', description: 'Unit is inactive' },
    { id: 1, name: 'Active', description: 'Unit is active' },
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
  this.disableForm();

  this.editUnitForm.get('unitId')?.valueChanges.subscribe(value => { // -- Listen for Unit Dropdown selection changes
    console.log('this.unitId', this.unitId);
    this.unitId = value;
    this.getUnit(this.unitId) 
    this.disableForm();
  });
}



// --  ACTIVATE/DEACTIVATE UNIT
onToggleChangeUnit(): void {
  console.log('Unit status changed to:', this.unitStatus);
  if(this.currentUnit){
    // console.log('CURRENT USER this.currentUser.id:', this.currentUint.id);
    this.dataService.updateUnitStatus(this.currentUnit.id, this.unitStatus)
    .subscribe(
      (responseData: any) => {
        console.log('response subscribe');
        if (responseData.status === 'success') {
          console.log('RESPONSE:', responseData);
          this.openSuccessModal(); // -- need to import to use
          this.getUnit(this.unitId)
          // this.disableEnableForm(); // --------------------------come back to this
        } else if (responseData.status === 'failure') {
          console.log('RESPONSE', responseData);
          this.openFailureModal('User update failed.'); // Handle failure
        }
      }
    );
    
  } else {
    console.log('NO_CURRENT_USER_SELECTED');
  }
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
    status: [{disabled: false }, [Validators.required] ],
    // unitStatus: [{disabled: false }, [Validators.required] ], // NEED TO ADD TO HTML
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
      console.log('this_currentUnit', this.currentUnit);
      this.updateEditUnitForm(this.currentUnit)
      this.unitStatus = this.currentUnit.deletedAt ? false : true
      console.log('this_currentUnit_deletedAt', this.currentUnit.deletedAt);
      console.log('unitStatus', this.unitStatus);
      this.disableEnableForm(); 
      if(!this.unitStatus){
        console.log('YES_UNIT_STATUS:', this.unitStatus);
        this.disableForm();
      }
    }
  }).add(() => {
    isLoading(false);
  });
}

// -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
disableEnableForm(){
  console.log('INSIDE_this.disableEnableForm();');
  if (!this.unitId) {
    console.log('NO_disable');  
    this.disableForm();
  } else {
    console.log('YES_enable');  
    if(this.unitStatus){
      this.enableForm();
    }
  }
}
// -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
disableForm(){ 
  // --  Don't enable organization dropdown
  console.log('disable_form');  
    this.editUnitForm.get('addressLineOne')?.disable();
    this.editUnitForm.get('addressLineTwo')?.disable();
    this.editUnitForm.get('city')?.disable();
    this.editUnitForm.get('state')?.disable();
    this.editUnitForm.get('zip')?.disable();
    this.editUnitForm.get('user')?.disable();
    this.formIsDisabled= true;
}
enableForm(){
  console.log('enable_form');  
  this.editUnitForm.get('addressLineOne')?.enable();
  this.editUnitForm.get('addressLineTwo')?.enable();
  this.editUnitForm.get('city')?.enable();
  this.editUnitForm.get('state')?.enable();
  this.editUnitForm.get('zip')?.enable();
  this.editUnitForm.get('user')?.enable();
  this.formIsDisabled = false;
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
    console.log('this.currentUnit.id', this.currentUnit.id,);
    const unitObj = {
      unitId: this.currentUnit.id,
      // associationId: formValues.associationId, //  don't send for now. 
      addressLineOne: formValues.addressLineOne,
      addressLineTwo: formValues.addressLineTwo,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      user: formValues.user,
      status: formValues.status === 'true' ? true : (formValues.status === 'false' ? false : null), //  true/false
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
