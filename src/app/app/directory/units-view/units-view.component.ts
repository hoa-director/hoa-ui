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
  currentUserId: number = parseInt(sessionStorage.getItem('userId'));
  currentUserPermission: object;
  renderAddButton: boolean = false;

  private userSubjectSubs: Subscription;
  isLoading = true;

  searchUnitsForm: FormGroup;
  inputStringSearch: string = '';
  canEditUnit: boolean = false;
  
  private usersCenterService: UsersCenterService;
  // userPermission: object | null
  // userCenterVisible = false

  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    // private userCenterService: UsersCenterService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef

  ) {
    this.searchUnitsForm = this.fb.group({
      inputTextSearch: [''],  // units and users
    })
  }

  getCurrentUrl(): string {
    return this.router.url; // Returns the current URL as a string
  }

  ngOnInit() {
    this.listenForEvents();
    // this.onFetchUnits(this.inputStringUnit); //  I don't think this is needed cause its in listenForEvents
    this.checkCurrentUserPermissions();
    // this.usersCenterService.fetchOneOrganizationRole()

    this.dataService.fetchUnits('').subscribe((responseData: any) => {
      this.units = responseData.directory;
    });
  }

  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
    this.renderAddButton = false;
  }


  // getCurrentUserRole(){
  //   this.dataService.fetchOneOrganizationRole()
  //   .subscribe((responseData: any) => {
  //       this.role = responseData;
  //       console.log('this.role;', this.role);
  //       console.log('responseData_roles_else:', responseData);    
  //   }).add(() => {
  //     // isLoading(false);
  //   });
  // } 

  // -- Loop through Permission Object, Turn the Edit Button on or off
  checkPermissionsObject(obj: Record<string, any>): void {
    for (const [key, value] of Object.entries(obj)) {
      if(key.toString() === 'can_edit') {
        // console.log('Can_edit_found and is:', value);
        if (value === true) {
          this.canEditUnit = true
        }
      }
      if(key.toString() === 'can_add') {
        if (value === true) {
          this.renderAddButton = true;
        }
      }
    }
  }
  // -- Check is user has unit editing permissions
  checkCurrentUserPermissions() {
    isLoading(true);
    // const pageURL = this.getCurrentUrl().split('/').pop(); 
    const parts = this.getCurrentUrl().split('/'); // Split the URL by '/'
    const pageURL = parts[parts.length - 2]; 
    // console.log('new_pageURL', pageURL);
    this.dataService.fetchCurrentUserPermission('unit-center').subscribe((Response: any) => { // -- MUST match database!
      // console.log('response', Response);
      this.checkPermissionsObject(Response);
    }).add(() => {
      isLoading(false);
    });
  }

  fetchSearchResults(inputString: string) {
    isLoading(true);
    this.dataService
      .searchUnits(inputString)
      .subscribe((responseData: any) => {
        this.units = [...responseData.directory];
        this.cdr.detectChanges();
      })
      .add(() => {
        isLoading(false);
      });
  }

  goToAddUnit() {
    this.router.navigate(['/home/directory/add']);
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe( // if association changes. Load when ever Directory is selected
      () => {
        // this.onFetchUnits(this.inputString); 
      }
    );
  }

  onInputChangeSearch() {
    this.fetchSearchResults(this.inputStringSearch)
  }

  onReset(): void {
    // this.searchUnitsForm.reset();  // did commenting this out fix the double firing issue???
    this.inputStringSearch = '';
    // this.onFetchUnits(this.inputStringUnit);
  }

  editUnit(unitId: number) {
    if (this.canEditUnit) {
      if (unitId) {
        this.router.navigate(['/home/directory/edit', unitId]);
      }
    }
  }
  editOwnUnit() {
    this.router.navigate(['/home/directory/update-phone']); // Navigate to the edit page with unitId
  }
}
