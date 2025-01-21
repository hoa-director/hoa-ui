import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { UsersCenterService } from "../../../services/users-center.service";
import { Subscription } from "rxjs";
import { ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

// css
import { isLoading } from "../../../shared/isLoading";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
// models
import { Unit } from ".././unit.model";

@Component({
  selector: 'app-units-view',
  templateUrl: './units-view.component.html',
  styleUrls: ['./units-view.component.css']
})
export class UnitsViewComponent implements OnInit, OnDestroy {
  units: Unit[] = [];
  users: any[] = [];

  private userSubjectSubs: Subscription;
  isLoading = true;

  searchUnitsForm: FormGroup;
  inputStringUnit: string = '';
  inputStringUser: string = '';
  canEditUnit: boolean = false;

  // searchByUserInfo: boolean = false; //  True = Search by UNIT Info. False = search by USER Info
  searchByUserInfo: boolean = false; 
  
constructor(
  private router: Router,
  private dataService: DataService,
  private userService: UserService,
  // private userCenterService: UsersCenterService,
  private fb: FormBuilder,
  private cdr: ChangeDetectorRef

) {
  this.searchUnitsForm = this.fb.group({
    inputTextUnit: [''],  // UNITS
    inputTextUser: ['']   // USERS
  })
}
ngOnInit() {
  this.listenForEvents();
  // this.onFetchUnits(this.inputStringUnit); //  I don't think this is needed cause its in listenForEvents
}

ngOnDestroy() {
  this.userSubjectSubs.unsubscribe();
}

// ----------------------- Doe something with this code to fix:  [(ngModel)]="inputStringUnit" ------------------ 
// -- UNIT SEARCH
onFetchUnits(inputString: string) {
  isLoading(true);
  this.dataService.fetchUnits(inputString || '')
  .subscribe((responseData: any) => {
    this.units = [...responseData.directory];
    this.cdr.detectChanges();
  }).add(() => {
    isLoading(false);
  });
}

// -- USER SEARCH
fetchUnitsByUser(inputString: string) {
    isLoading(true);
    this.dataService.fetchUnitsByUserAPI(inputString || '')
    .subscribe((responseData: any) => {
      this.units = [...responseData];
    }).add(() => {
      isLoading(false);
    });
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe( // if association changes. Load when ever Directory is selected
      () => {
        // this.onFetchUnits(this.inputString); 
      }
    );
  }

  // --  UNIT INPUT
  onInputChangeUnit() { // -- dynamically update inputString STATE, then Search.
    if (this.inputStringUnit.length > 0){
      this.searchByUserInfo = false;
    }
    if(this.searchByUserInfo === false){
      this.inputStringUser = ''
      this.onFetchUnits(this.inputStringUnit)
    }
  }

  // --  USER INPUT
  onInputChangeUser() { // -- dynamically update inputString STATE, then Search.
    if (this.inputStringUser.length > 0){
      this.searchByUserInfo = true;
    }
    if(this.searchByUserInfo === true){
      this.inputStringUnit = '';
    this.fetchUnitsByUser(this.inputStringUser)
  }
  }

  onReset(): void {
    // this.searchUnitsForm.reset();  // did commenting this out fix the double firing issue???
    this.inputStringUnit = '';
    this.inputStringUser = '';
    // this.onFetchUnits(this.inputStringUnit);
  }

  editUnit(unitId: number) {
    if(unitId){
      this.router.navigate(['/home/directory/units-edit', unitId]); // Navigate to the edit page with unitId
    } else {
      console.log('EDIT-NO-UNITID', unitId);
      this.router.navigate(['/home/directory/units-edit']); // Navigate to the edit page with unitId
    }
  }

}
