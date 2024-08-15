import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { UserService } from "../../../services/user.service";
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
  isLoading = false;

  searchUnitsForm: FormGroup;
  inputString: string = '';
  
constructor(
  private dataService: DataService,
  private userService: UserService,
  private fb: FormBuilder,
  
) {
  this.searchUnitsForm = this.fb.group({
    inputText: ['']
  })
}
ngOnInit() {
  console.log('OnINIT');
  this.listenForEvents();
  // this.onFetchUnits(this.inputString); //  I don't think this is needed cause its in listenForEvents
}

ngOnDestroy() {
  this.userSubjectSubs.unsubscribe();
}

// ----------------------- Doe something with this code to fix:  [(ngModel)]="inputString" ------------------ 
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

  listenForEvents() {
    console.log('LISTEN_FRO_EVENTS');
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe( // if association changes. Load when ever Directory is selected
      () => {
        console.log('EVENT_TRIGGERED');
        // this.onFetchUnits(this.inputString); 
      }
    );
  }

  onInputChange() { // -- dynamically update inputString STATE, then Search.
    console.log('INPUT_CHANGED');
    this.onFetchUnits(this.inputString)
  }

  onReset(): void {
    console.log('OnREST');
    this.searchUnitsForm.reset();
    this.inputString = '';
    // this.onFetchUnits(this.inputString);
    console.log('this.inputString', this.inputString);
  }

}
