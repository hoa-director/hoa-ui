import { Component, OnInit, OnDestroy } from '@angular/core';

// -- css
import { isLoading } from "../../../shared/isLoading";
import { MatDialog } from "@angular/material/dialog";
// -- models
import { Unit } from ".././unit.model"
// -- components
import { UnitModalComponent } from "../../modal/unit-modal/unit-modal.component";

@Component({
  selector: 'app-units-add',
  templateUrl: './units-add.component.html',
  styleUrls: ['./units-add.component.css']
})
export class UnitsAddComponent implements OnInit, OnDestroy {
  newUnit: Unit[] = [];
  isLoading = false;

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.listenForEvents();
  }

  ngOnDestroy() {
    // this.userSubjectSubs.unsubscribe();
  }

  openUnitModal() {
    this.dialog.open(UnitModalComponent);
  }

}
