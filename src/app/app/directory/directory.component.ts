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

  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    // private dataService: DataService,
    // private userService: UserService,
    // private dialog: MatDialog,

  ) {

    this.directoryLinks = [
      {
        name: "Directory Home",
        path: "units-view",
      },
      {
        name: "Add Unit",
        path: "units-add", // -- Need to create
      },
      // {
      //   name: "Edit Unit",
      //   path: "units-edit", // -- Need to create
      // },
    ];

  }

  // ngOnInit() {
  //   this.listenForEvents();
  //   this.onFetchUnits();
  // }

  // ngOnDestroy() {
  //   this.userSubjectSubs.unsubscribe();
  // }

  // onFetchUnits() {
  //   isLoading(true);
  //   this.dataService.fetchUnits().subscribe((responseData: any) => {
  //     this.units = [...responseData.units];
  //   }).add(() => {
  //     isLoading(false);
  //   });
  // }

  // listenForEvents() {
  //   this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
  //     () => {
  //       this.onFetchUnits();
  //     }
  //   );
  // }

  // openUnitModal() {
  //   this.dialog.open(UnitModalComponent);
  // }

}
