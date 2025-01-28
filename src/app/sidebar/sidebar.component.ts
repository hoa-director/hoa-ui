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
  showUsersCenter: boolean = false; // Example: Hidden by default
  showLogoutButton: boolean = true;


  links: Array<{ path: string; label: string; active: boolean }> = []
  // links: Array<{ path: string; label: string; active: boolean }> = [
  //   {
  //     path: 'directory',
  //     label: 'Neighborhood Directory',
  //     active: true,
  //   },
  //   {
  //     path: 'rules',
  //     label: 'Rules & Regulations',
  //     active: true,
  //   },
  //   {
  //     path: 'resolution-center',
  //     label: 'Resolution Center',
  //     active: true,
  //   },
  //   {
  //     path: 'financials',
  //     label: 'Financials',
  //     active: false,
  //   },
  //   {
  //     path: 'documents',
  //     label: 'Association Documents',
  //     active: true,
  //   },
  //   {
  //     path: 'exterior',
  //     label: 'Exterior Maintenance',
  //     active: false,
  //   },
  //   {
  //     path: 'interior',
  //     label: 'Interior Maintenance',
  //     active: false,
  //   },
  //   {
  //     path: 'board',
  //     label: 'Board of Directors',
  //     active: false,
  //   },
  //   {
  //     path: 'notes',
  //     label: 'Meeting Notes',
  //     active: false,
  //   },
  //   {
  //     path: 'profile',
  //     label: 'Edit Profile',
  //     active: false,
  //   },
  // ];

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router,

  ) {

  // getCurrentUrl(): string { // -- not using 
  //   return this.router.url; // Returns the current URL as a string
  // }

  }

  // ngOnInit() {
  //   this.init();
  //   const associationSubscription = this.userService.currentAssociationUpdated.subscribe(
  //     () => {
  //       this.init();
  //     },
  //   );
  //   const userSubscription = this.userService.userUpdated.subscribe(() => {
  //     this.init();
  //   });
  //   this.subscriptions.push(associationSubscription, userSubscription);
  // }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscriptions.map((subscription) => {
  //     subscription.unsubscribe();
  //   });
  // }

  // init() {
  //   this.userService.isLoggedIn().subscribe((res) => {
  //     this.userIsLoggedIn = res;
  //   });
  // }

  ngOnInit() {
    this.links = [];

    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.listenForEvents();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // -- Loop through Permission Object, add each Navbar Link to the array, based on user permissions
    checkPermissionsObject(obj: Record<string, any>): void {
      for (const [key, value] of Object.entries(obj)) {
  
        if(key.toString() === 'can_view') {
          if (value === true) {
          this.links.push(
            { label: "Directory Home", path: "units-view", active: true },
          );
        }
      }
        if(key.toString() === 'can_add') {
          if (value === true) {
            this.links.push(
              { label: "Add Unit", path: "units-add", active: true  },
            );
          }
        }
        if(key.toString() === 'can_edit') {
          if (value === true) {
            this.links.push(
              { label: "Edit Unit", path: "units-edit", active: true  },
            );
          }
        }
        // console.log('Adding:',key.toString());
      }
      // console.log('directoryLinks1', this.directoryLinks);
    }
  
    // -- Get list of Directory/Unit-center Navbar Links/permissions. (Not the same as the units grid)
    checkCurrentUserPermissions() {
      // isLoading(true);
      // const pageURL = this.getCurrentUrl().split('/').pop(); 
      // this.dataService.fetchCurrentUserPermission('directory').subscribe((Response: any) => {
      this.dataService.fetchCurrentUserPermission('unit-center').subscribe((Response: any) => { // -- MUST match database!
        console.log('response', Response);
        this.checkPermissionsObject(Response);
      }).add(() => {
        // isLoading(false);
      });
    }

  listenForEvents() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      (isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.checkCurrentUserPermissions()
        // if(!isAuthenticated) return;
      }
    );
  }

  onLogout() {
    this.userService.logout();
  }
}
