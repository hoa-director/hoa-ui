import { Component, OnInit, OnDestroy } from '@angular/core';
// -- css
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isLoading } from "../../../shared/isLoading";
import { MatDialog } from "@angular/material/dialog";
// -- models
import { Unit } from ".././unit.model"
// -- components
import { UnitModalComponent } from "../../modal/unit-modal/unit-modal.component";
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-units-add',
  templateUrl: './units-add.component.html',
  styleUrls: ['./units-add.component.css']
})
export class UnitsAddComponent implements OnInit, OnDestroy {
  // newUnit: Unit[] = [];
  addUnitForm: FormGroup;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.listenForEvents();
    this.addUnitForm = this.fb.group({
      associationId: [], 
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
    isLoading(true);

    if (this.addUnitForm.valid){
      const formValues = this.addUnitForm.value;

      let unit: Unit = {
         // id: 10, 
        // user_id: null,
        associationId: formValues.associationId,
        addressLineOne: 'test address1111111',
        addressLineTwo: 'testaddress2222222',
        city: 'Hastings', 
        state: 'MN',
        zip: 55033,
        // updatedAt: '2024-07-19 18:47:52.63-05',
        // createdAt: '2024-07-19 18:47:52.63-05',
      }
      console.log('formValues', formValues);
      console.log('formValues.associationId', formValues.associationId);

    this.dataService.addUnit(unit)
    .subscribe((responseData: any) => {
      console.log('responseData', responseData);
      return responseData
    }, (error) => {
      console.log('unit-add ERROR', error);
    }
  )
  .add(() => {
    setTimeout(() => {
      isLoading(false)
    }, 500);
  });
}



  }


}
