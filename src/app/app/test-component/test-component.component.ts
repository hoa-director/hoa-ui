import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

// -- SERVICES
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";

// --  MODELS
import { testRow } from "./testRows.model";
import { Rule } from '../rules/rule.model';

// -- COMPONENTS
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
  testRows: Array<{ id: number, column1string: string }> = [];  // -- MODEL
  // deletedRows: Array<{ id: number, column1string: string }> = []; 
  rules: Rule[] = [];
  addRow: testRow[] = [];

  private loadingListenerSubs: Subscription;
  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,  // -- SERVICE
    private userService: UserService, // -- SERVICE
    // private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ListenForEvents();
    // this.onDeleteRow();
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


// -- WORKS
  onFetchRows() {
    isLoading(true);
    this.dataService.fetchRows().subscribe((responseData: any) => {
      if(responseData){
        this.testRows = [...responseData];
        // console.log('testRows:', this.testRows)
      }
    })
      .add(() => {
        isLoading(false);
      });
  };

  // -- WORKS -- ONLY Adds a 'deleted_at' value, doesn't actually delete.
  onDeleteRow(deleteThis) {
    isLoading(true);
    this.dataService
    .deleteRowAPI(deleteThis) // -- this does fire 
    .subscribe((responseData: any) => {

      console.log("createTestRow responseData:", responseData);
      // this.deletedRows = [responseData];
    })
      .add(() => {
        this.onFetchRows();
        isLoading(false);
      });
  };



// -- WORKS
  onCreateTestRow() {
    isLoading(true);
    this.dataService
    .createTestRow('Adding a row', true, 1138) // -- this does fire 
    .subscribe((responseData: any) => {
      // console.log("createTestRow responseData:", responseData);
      this.testRows = [responseData];
    })
      .add(() => {
        this.onFetchRows();
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
