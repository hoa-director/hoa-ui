import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { DataService } from "../../../services/data.service";
import { UsersCenterService } from "../../../services/users-center.service";
import { Subscription } from "rxjs";
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

  // searchByUserInfo: boolean = false; //  True = Search by UNIT Info. False = search by USER Info
  searchByUserInfo: boolean = false; 
  
constructor(
  private dataService: DataService,
  private userService: UserService,
  private userCenterService: UsersCenterService,
  private fb: FormBuilder,
  
) {
  this.searchUnitsForm = this.fb.group({
    inputTextUnit: [''],  // UNITS
    inputTextUser: ['']   // USERS
  })
}
ngOnInit() {
  console.log('OnINIT');
  this.listenForEvents();
  // this.onFetchUnits(this.inputStringUnit); //  I don't think this is needed cause its in listenForEvents
}

ngOnDestroy() {
  this.userSubjectSubs.unsubscribe();
}

// ----------------------- Doe something with this code to fix:  [(ngModel)]="inputStringUnit" ------------------ 
// -- UNIT SEARCH
onFetchUnits(inputString: string) {
  console.log('IN_FETCH_UNITS');
  isLoading(true);
  this.dataService.fetchUnits(inputString || '')
  .subscribe((responseData: any) => {
    console.log('RESPONSE.DATA:', responseData);
    this.units = [...responseData];
    // console.log('this.units:', this.units);
  }).add(() => {
    isLoading(false);
  });
}

// -- USER SEARCH
fetchUnitsByUser(inputString: string) {
    console.log('IN_FETCH_USERS');
    console.log('INPUT_STRING', inputString);
    isLoading(true);
    this.dataService.fetchUnitsByUserAPI(inputString || '')
    .subscribe((responseData: any) => {
      console.log('RESPONSE.DATA:', responseData);
      this.units = [...responseData];
      // console.log('this.units:', this.units);
    }).add(() => {
      isLoading(false);
    });
  }

  listenForEvents() {
    console.log('LISTEN_FRO_EVENTS');
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe( // if association changes. Load when ever Directory is selected
      () => {
        console.log('EVENT_TRIGGERED');
        // this.onFetchUnits(this.inputString); 
      }
    );
  }

  // --  UNIT INPUT
  onInputChangeUnit() { // -- dynamically update inputString STATE, then Search.
    console.log('INPUT_CHANGED_UNIT');
    if (this.inputStringUnit.length > 0){
      this.searchByUserInfo = false;
    }
    if(this.searchByUserInfo === false){
      this.inputStringUser = ''
      this.onFetchUnits(this.inputStringUnit)
    }
    // console.log('searchByUserInfo =', this.searchByUserInfo);
    console.log('searchByUserInfo =', this.searchByUserInfo);
  }

  // --  USER INPUT
  onInputChangeUser() { // -- dynamically update inputString STATE, then Search.
    console.log('INPUT_CHANGED_USER');
    if (this.inputStringUser.length > 0){
      this.searchByUserInfo = true;
    }
    if(this.searchByUserInfo === true){
      this.inputStringUnit = '';
    this.fetchUnitsByUser(this.inputStringUser)
  }
  console.log('searchByUserInfo =', this.searchByUserInfo);
  console.log('this.inputStringUser =', this.inputStringUser);
  }

  onReset(): void {
    console.log('OnREST');
    // this.searchUnitsForm.reset();  // did commenting this out fix the double firing issue???
    this.inputStringUnit = '';
    this.inputStringUser = '';
    // this.onFetchUnits(this.inputStringUnit);
    console.log('this.inputStringUnit', this.inputStringUnit);
  }

}
