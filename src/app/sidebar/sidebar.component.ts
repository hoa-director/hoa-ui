import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataService } from "../services/data.service";
import { UsersCenterService } from '../services/users-center.service';
import { Router } from '@angular/router';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = true;
  private authListenerSubs: Subscription;
  
  // --  Sidebar Links
  showNeighborhoodDirectory: boolean = false;
  showRulesAndRegulations: boolean = false;
  showResolutionCenter: boolean = false;
  showAssociationDocuments: boolean = false;
  showUsersCenter: boolean = false;
  showNeighborhoodCenter: boolean = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.listenForEvents();
    this.checkCurrentUserSideBarPermissions();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // hideSidebarLinks() {
  //   this.showNeighborhoodDirectory = false;
  //   this.showRulesAndRegulations = false;
  //   this.showResolutionCenter = false;
  //   this.showAssociationDocuments = false;
  //   this.showUsersCenter = false; 
  // }

  checkCurrentUserSideBarPermissions() {
    this.dataService.fetchCurrentUserSideBarPermission()
    .subscribe((response: any) => {
      this.setSidebarLinkVisibility(response);
    });
  }

  //  -- Turn on sidebar links user has access to
  setSidebarLinkVisibility(response: any) { 
    if (response.unitCenter) { this.showNeighborhoodDirectory = response.unitCenter }; 
    if (response.rules) { this.showRulesAndRegulations = response.rules }; 
    if (response.resolutionCenter) { this.showResolutionCenter = response.resolutionCenter }; 
    if (response.documents) { this.showAssociationDocuments = response.documents }; 
    if (response.usersCenter) { this.showUsersCenter = response.usersCenter };
    if (response.neighborhoodCenter) { this.showNeighborhoodCenter = response.neighborhoodCenter };
  }

  goToDirectoryView(event: MouseEvent) {
    event.preventDefault();  // Prevent the default navigation triggered by routerLink
    this.router.navigate(['/home/directory/view']);
  }

  listenForEvents() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      (isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );
  }
}
