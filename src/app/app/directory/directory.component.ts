import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { Unit } from "./unit.model";
import { isLoading } from "../../shared/isLoading";
import { MatDialog } from "@angular/material/dialog";
import { UnitModalComponent } from "../modal/unit-modal/unit-modal.component";

@Component({
  selector: "app-directory",
  templateUrl: "./directory.component.html",
  styleUrls: ["./directory.component.css"],
})
export class DirectoryComponent    {
  directoryLinks: any[];

  activeLink: string;
  units: Unit[] = [];
  currentUserPermission: object

  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    // private dialog: MatDialog,

  ) {

    this.directoryLinks = [
    ];
    // this.directoryLinks2 = [
    //   {
    //     name: "Directory Home",
    //     path: "units-view",
    //   },
    // ];
    // this.directoryLinks3 = [
    //   {
    //     name: "Directory Home",
    //     path: "units-view",
    //   },
    //   {
    //     name: "Add Unit",
    //     path: "units-add", // -- Need to create
    //   },
    // ];
    // this.directoryLinks4 = [
    //   {
    //     name: "Directory Home",
    //     path: "units-view",
    //   },
    //   {
    //     name: "Add Unit",
    //     path: "units-add", // -- Need to create
    //   },
    //   {
    //     name: "Edit Unit",
    //     path: "units-edit", // -- Need to create
    //   },
    // ];

  }

  ngOnInit() {
    this.directoryLinks = [];
    this.listenForEvents();
    // this.onFetchUnits();
  }

  // ngOnDestroy() {
  //   this.userSubjectSubs.unsubscribe();
  // }

  // onFetchUnits() {
  //   isLoading(true);
  //   this.dataService.fetchUnits('').subscribe((responseData: any) => {
  //     this.units = responseData.units.;
  //     console.log('this.units', this.units);
  //   }).add(() => {
  //     isLoading(false);
  //   });
  // }

  // -- Loop through Permission Object, add each permission to the directoryLink array
  checkPermissionsObject(obj: Record<string, any>): void {
    for (const [key, value] of Object.entries(obj)) {
      
      if(key.toString() === 'can_view') {
        if (value === true) {
        this.directoryLinks.push(
          { name: "Directory Home", path: "units-view" },
        );
      }
    }
      if(key.toString() === 'can_add') {
        if (value === true) {
          this.directoryLinks.push(
            { name: "Add Unit", path: "units-add" },
          );
        }
      }
      if(key.toString() === 'can_edit') {
        if (value === true) {
          this.directoryLinks.push(
            { name: "Edit Unit", path: "units-edit" },
          );
        }
      }
      // console.log('Adding:',key.toString());
    }
    // console.log('directoryLinks1', this.directoryLinks);
  }

  checkCurrentUserPermissions() {
    isLoading(true);
    this.dataService.fetchCurrentUserPermission().subscribe((Response: any) => {
      console.log('response', Response);
      this.checkPermissionsObject(Response);
    }).add(() => {
      isLoading(false);
    });
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
      () => {
        // this.onFetchUnits();
        this.checkCurrentUserPermissions()
      }
    );
  }

  // openUnitModal() {
  //   this.dialog.open(UnitModalComponent);
  // }

}
