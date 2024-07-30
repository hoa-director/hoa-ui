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
    this.listenForEvents();
    this.onFetchUnits();
  }

  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  onFetchUnits() {
    isLoading(true);
    this.dataService.fetchUnits()
    .subscribe((responseData: any) => {
      this.units = [...responseData];
      console.log('this.units', this.units);
      console.log('this.units[0]', this.units[0]);
    }).add(() => {
      isLoading(false);
    });
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
      () => {
        this.onFetchUnits();
      }
    );
  }

  onInputChange() { // -- dynamically update inputString STATE, then Search.
    // this.onFetchUnits(this.inputString)
    console.log('Input Changed');
  }

  onReset(): void {
    this.searchUnitsForm.reset();
    this.inputString = '';
    this.onFetchUnits();
  }

}
