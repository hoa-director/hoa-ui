import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../../../../services/user.service";
import { DataService } from "app/services/data.service";
import { ActivatedRoute, Router } from '@angular/router';
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
  private route: ActivatedRoute,
  private router: Router
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
    // console.log('on_Init_VALUE', value);
    this.unitId = value;
    // console.log('on_Init_this.unitId', this.unitId);
    this.getUnit(this.unitId) 
    this.disableForm();
  });
}

// -- GET PARAMS (IF THEY EXIST)
getParams(){
  // console.log('IN_PARAMS_FUNCTION');
  this.route.paramMap.subscribe(params => {
    this.unitId = +params.get('unitId'); // Convert to number
    if (this.unitId) {
      // console.log('UNIT_PARAMS_EXIST_unitId:', this.unitId);
      this.getUnit(this.unitId)
    } else {
      // console.log('NO_PARAMS');
    }
  });
}

// --  ACTIVATE/DEACTIVATE UNIT
// onToggleChangeUnit(): void {
//   if(this.currentUnit){
//     // console.log('CURRENT USER this.currentUser.id:', this.currentUint.id);
//     this.dataService.updateUnitStatus(this.currentUnit.id, this.unitStatus)
//     .subscribe(
//       (responseData: any) => {
//         if (responseData.status === 'success') {
//           // console.log('ToggleChangeunit responseData:', responseData);
//           this.openSuccessModal("Successfully updated address's status");
//           this.getUnit(this.unitId)
//           // this.disableEnableForm(); // --------------------------come back to this
//         } else if (responseData.status === 'failure') {
//           this.openFailureModal('User update failed.'); // Handle failure
//         }
//       }
//     );
//   } else { // this code should never fire. It's just incase.
//     console.error('No current unit selected');
//     alert('No Unit Selected');
//   }
// }

// --  GET ALL UNITS DROPDOWN -- //
getAllUnits(){
    isLoading(true);
    this.dataService.fetchUnits('')
    .subscribe((responseData: any) => {
      this.allUnits = [...responseData.directory];
      // this.cdr.detectChanges();
    }).add(() => {
      isLoading(false);
    });
}

// --  GET AVAILABLE USERS DROPDOWN -- //
getAvailableUsers(){
    isLoading(true);
    this.dataService.getAvailableUsers()
    .subscribe((responseData: any) => {
      this.availableUsers = [...responseData];
      if (this.currentUnit.user && this.currentUnit.userId !== 0) {
        this.availableUsers.unshift({
          id: this.currentUnit.userId,
          firstName: this.currentUnit.user.firstName,
          lastName: this.currentUnit.user.lastName
        });
    }
      // this.cdr.detectChanges();
    }).add(() => {
      isLoading(false);
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
  isLoading(true);
  this.dataService.fetchOneUnit(unitId)
  .subscribe((responseData: any) => {
    this.currentUnit = responseData;
    if (this.currentUnit){
      // console.log('currentUnit:', this.currentUnit );
      this.updateEditUnitForm(this.currentUnit)
      this.unitStatus = this.currentUnit.deletedAt ? false : true;
      this.disableEnableForm(); 
      if(!this.unitStatus){
        this.disableForm();
      }
    }
  }).add(() => {
    isLoading(false);
  });
}

// -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
disableEnableForm(){
  if (!this.unitId) {
    this.disableForm();
  } else {
    if(this.unitStatus){
      this.enableForm();
    }
  }
}
// -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
disableForm(){ 
  // --  Don't enable organization dropdown
    this.editUnitForm.get('addressLineOne')?.disable();
    this.editUnitForm.get('addressLineTwo')?.disable();
    this.editUnitForm.get('city')?.disable();
    this.editUnitForm.get('state')?.disable();
    this.editUnitForm.get('zip')?.disable();
    this.editUnitForm.get('user')?.disable();
    this.formIsDisabled= true;
}
enableForm(){
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
    user: unit.userId || 0
  });
}


// -- SUBMIT UNIT CHANGES
saveUnitChanges(){
  // this.getUnit(this.unitId)
  if(this.editUnitForm.valid){
    const formValues = this.editUnitForm.value
    const unitObj = {
      unitId: this.currentUnit.id,
      // associationId: formValues.associationId, //  don't send for now. 
      addressLineOne: formValues.addressLineOne,
      addressLineTwo: formValues.addressLineTwo,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      userId: formValues.user === 0 ? null : parseInt(formValues.user),
      status: formValues.status === 'true' ? true : (formValues.status === 'false' ? false : null), //  true/false
    } 
    this.dataService
    .updateUnit(unitObj)
    .subscribe(
      (responseData: any) => {
        if (responseData.status === 'success') {
          this.openSuccessModal("Information for the address was successfully updated");
          this.router.navigate(['/home/directory/view']);
        } else if (responseData.status === 'failure') {
          this.openFailureModal('Failed to update address information'); // Handle failure
        }
      }
    );
  }
}

onDelete() {
  const confirmed = window.confirm("Are you sure you want to permanently delete this address?");
  if (confirmed) {
    const unitId = this.currentUnit.id;
    this.dataService.deleteUnit(unitId).subscribe((response: any) => {
      if (response.status === 'success') {
        this.openSuccessModal("Successfully deleted address");
        this.router.navigate(["/home/directory/view"]);
      } else {
        this.openFailureModal("Failed to delete address");
      }
    })
  } else {
    return;
  }
}

// -- CANCEL
onReset(): void {
  this.router.navigate(['/home/directory/view']);
}

openSuccessModal(message: string) {
  this.dialog.open(SuccessModalComponent, {
    data: { message: message }
  });
}

openFailureModal(message: string) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}

}
