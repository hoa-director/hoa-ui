import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-resolution-center",
  templateUrl: "./resolution-center.component.html",
  styleUrls: ["./resolution-center.component.css"],
})
export class ResolutionCenterComponent implements OnInit {
  resolutionCenterLinks: any[];
  activeLink: string;
  isLoading = false;
  private userSubjectSubs: Subscription;
  
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resolutionCenterLinks = [];
  }

  ngOnInit() {
    this.resolutionCenterLinks = [];
    this.listenForEvents();

    // set active tab based on url
    this.router.events.subscribe(() => {
      switch (this.getCurrentUrl()) {
        case "/home/resolution-center/open":
          this.activeLink = "Open Motions";
          break;
        case "/home/resolution-center/past":
          this.activeLink = "Past Motions";
          break;
        case "/home/resolution-center/new":
          this.activeLink = "File New Motion";
          break;
        default:
          this.activeLink = "";
          break;
      }
    })
  }

  getCurrentUrl(): string {
    return this.router.url; // Returns the current URL as a string
  }

  // -- Loop through Permission Object, add each Navbar Link to the array, based on user permissions
  checkPermissionsObject(obj: Record<string, any>): void {
    this.resolutionCenterLinks = [];
    for (const [key, value] of Object.entries(obj)) {
      if (key.toString() === "can_view") {
        // -- Handles BOTH Open & Past Motions Links
        if (value === true) {
          this.resolutionCenterLinks.push(
            // -- Open Motions
            { name: "Open Motions", path: "open" }
          );
          this.resolutionCenterLinks.push(
            // -- Past Motions
            { name: "Past Motions", path: "past" }
          );
        }
      }
      if (key.toString() === "can_add") {
        if (value === true) {
          this.resolutionCenterLinks.push(
            // -- Can created Motions
            { name: "File New Motion", path: "new" }
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
    this.dataService.fetchCurrentUserPermission("resolution-center").subscribe((Response: any) => {
        // -- MUST match database!
        // console.log("response", Response);
        this.checkPermissionsObject(Response);
      })
      .add(() => {
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
