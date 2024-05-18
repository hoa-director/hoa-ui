import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { testRow } from "./testRows.model";
import { Rule } from '../rules/rule.model';
import { isLoading } from "../../shared/isLoading";

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})


// -------- Test component gets list of rules and can console log individual rules.

export class TestComponentComponent {
  testRows: testRow[] = [];
  rules: Rule[] = [];

  private loadingListenerSubs: Subscription;
  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.ListenForEvents();
    // this.onFetchRules();
    // this.onfetchTestRows();

  }
  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  ListenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
      () => {
        this.onFetchRules();
        this.onCreateTestRow();
      }
    );
  }

// --  This works
  onFetchRules() {
    isLoading(true);
    this.dataService
    .fetchRules() // -- this does fire 
    .subscribe((responseData: any) => {
      console.log(" onFetchRules responseData", responseData);
      this.rules = [...responseData];})
      .add(() => {
        isLoading(false);
      });
  };

// --  This works now!!! - First working API Call!!
  onCreateTestRow() {
    isLoading(true);
    this.dataService
    .createTestRow('API Call', true, 333) // -- this does fire 
    .subscribe((responseData: any) => {
      console.log("createTestRow responseData:", responseData);
      this.testRows = [...responseData];})
      .add(() => {
        isLoading(false);
      });
  };


  // -- This works when button pressed
  consoleLog(rule): void {
    console.log(rule, 'CONSOLE LOG WORKS!');
    // this.onfetchTestRows();
  }


}
