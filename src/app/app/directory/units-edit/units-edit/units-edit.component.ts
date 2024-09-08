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

  this.editUnitForm.get('unitId')?.valueChanges.subscribe(value => { // -- Listen for Unit Dropdown selection changes
    console.log('this.unitId', this.unitId);
    this.unitId = value;
    this.getUnit(this.unitId) 
  });
}

// --  GET ALL UNITS FOR DROPDOWN -- //
getAllUnits(){
    console.log('IN_FETCH_UNITS');
    isLoading(true);
    this.dataService.fetchUnits('')
    .subscribe((responseData: any) => {
      // console.log('RESPONSE.DATA:', responseData);
      this.allUnits = [...responseData];
      console.log('this.allUnits:', this.allUnits);
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
    user: [''], // required
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


// -- SUBMIT UNIT
updateUnit(){
  console.log('UPDATE UNIT!');
  this.getUnit(this.unitId)
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

}
