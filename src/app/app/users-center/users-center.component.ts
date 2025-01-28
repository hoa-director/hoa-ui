import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-center',
  templateUrl: './users-center.component.html',
  styleUrls: ['./users-center.component.css']
})
export class UsersCenterComponent implements OnInit {
  usersCenterLinks: any[];
  activeLink: string;
  private userSubjectSubs: Subscription;


  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) {
    this.usersCenterLinks = [];
    // this.usersCenterLinks = [
    //   {
    //     name: "View Users",
    //     path: "users-view"
    //   },
    //   {
    //     name: "Add User",
    //     path: "users-add",
    //   },
    //   {
    //     name: "Edit User",
    //     path: "users-edit",
    //   }
    // ];
  }
  getCurrentUrl(): string {
    return this.router.url; // Returns the current URL as a string
  }

  ngOnInit() {
    this.usersCenterLinks = [];
    this.listenForEvents();
    // this.activeLink = this.usersCenterLinks[0].name
  }

      // -- Loop through Permission Object, add each Navbar Link to the array, based on user permissions
    checkPermissionsObject(obj: Record<string, any>): void {
      for (const [key, value] of Object.entries(obj)) {
        
        if(key.toString() === 'can_view') {
          if (value === true) {
          this.usersCenterLinks.push(
            {  name: "View Users", path: "users-view" },
          );
        }
      }
        if(key.toString() === 'can_add') {
          if (value === true) {
            this.usersCenterLinks.push(
              { name: "Add User", path: "users-add", },
            );
          }
        }
        if(key.toString() === 'can_edit') {
          if (value === true) {
            this.usersCenterLinks.push(
              { name: "Edit User", path: "users-edit", },
            );
          }
        }
        // console.log('Adding:',key.toString());
      }
      // console.log('directoryLinks1', this.directoryLinks);
    }  

    checkCurrentUserPermissions() {
      // isLoading(true);
      // const parts = this.getCurrentUrl().split('/'); 
      // const pageURL = parts[parts.length - 2 ]; 
      // console.log('new_pageURL', pageURL);
      this.dataService.fetchCurrentUserPermission('users-center').subscribe((Response: any) => {
        console.log('response', Response);
        this.checkPermissionsObject(Response);
      }).add(() => {
        // isLoading(false);
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

}
