import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { NeighborhoodCenterService } from "../../services/neighborhood-center.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-neighborhood-center',
  templateUrl: './neighborhood-center.component.html',
  styleUrls: ['./neighborhood-center.component.css']
})
export class NeighborhoodCenterComponent implements OnInit {

  userCanView: boolean = false;
  userCanAdd: boolean = false;
  userCanEdit: boolean = false;
  userCanDelete: boolean = false;

  constructor(
    private dataService: DataService,
    private neighborhoodCenterService: NeighborhoodCenterService,
    private router: Router
  ) {}

  ngOnInit() {}
  
  ngOnDestroy() {
    this.userCanView = false;
    this.userCanAdd = false;
    this.userCanEdit = false;
    this.userCanDelete = false;
  }

  // -- Loop through Permission Object to ensure user has permissions to view, add, edit, and delete
  checkPermissionsObject(obj: Record<string, any>): void {
    for (const [key, value] of Object.entries(obj)) {   
      if (key.toString() === 'can_view') {
        if (value === true) {
          this.userCanView = true;
        }
      } else if (key.toString() === 'can_add') {
        if (value === true) {
          this.userCanAdd = true;
        }
      } else if (key.toString() === 'can_edit') {
        if (value === true) {
          this.userCanEdit = true;
        }
      } else if (key.toString() === 'can_delete') {
        if (value === true) {
          this.userCanDelete = true;
        }
      }
    }
  }  

  checkCurrentUserPermissions() {
    this.dataService.fetchCurrentUserPermission('neighborhood-center').subscribe((Response: any) => {
      this.checkPermissionsObject(Response);
    });
  }
}
