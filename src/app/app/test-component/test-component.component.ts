import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { testRow } from "./testRows.model";
import { Rule } from '../rules/rule.model';
import { isLoading } from "../../shared/isLoading";
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})


// -------- Test component gets list of rules and can console log individual rules.

export class TestComponentComponent {
  testRows: Array<{ id: number, column1string: string }> = [];
  rules: Rule[] = [];
  addRow: testRow[] = [];

  private loadingListenerSubs: Subscription;
  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ListenForEvents();
      this.onFetchRows();
  }
  
  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  ListenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe( // - listen for Association change
      () => {
        // this.onCreateTestRow(); // -- move this to a form 
        // this.onUpdateRow();
        this.onFetchRows();
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
      this.testRows = [...responseData];
      this.cdr.detectChanges();
    })
      .add(() => {
        isLoading(false);
      });
  };


// -- WORKS
  onFetchRows() {
    isLoading(true);
    this.dataService
    .fetchRows() // -- this does fire 
    .subscribe((responseData: any) => {
      if(responseData){
        this.testRows = [...responseData];
        // console.log('testRows:', this.testRows)
      }
    })
      .add(() => {
        isLoading(false);
      });
  };

// -- WORKS
  onCreateTestRow() {
    isLoading(true);
    this.dataService
    .createTestRow('Adding a row', true, 1138) // -- this does fire 
    .subscribe((responseData: any) => {
      console.log("createTestRow responseData:", responseData);
      this.testRows = [responseData];
    })
      .add(() => {
        isLoading(false);
      });
  };

// -- WORKS
  onUpdateRow() {
    isLoading(true);
    this.dataService
    .updateRow('API UPDATE Works!') // -- this does fire 
    .subscribe((responseData: any) => {
      console.log("UPDATE Row responseData:", responseData);
      this.testRows = [...responseData];
    })
      .add(() => {
        isLoading(false);
      });
  };


  // -- This works when button pressed
  consoleLog(row): void {
    console.log('Row:', row);
    // this.onfetchTestRows();
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data: {
  //       column1string: "thing go here",
  //       column2boolean: false,
  //       column3int: 888,
  //     },
  //   });
  // }


}
