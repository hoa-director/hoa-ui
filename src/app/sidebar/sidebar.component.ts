import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = true;
  private authListenerSubs: Subscription;

  links: Array<{ path: string; label: string; active: boolean }> = [
    {
      path: 'directory',
      label: 'Neighborhood Directory',
      active: true,
    },
    {
      path: 'rules',
      label: 'Rules & Regulations',
      active: true,
    },
    {
      path: 'resolution-center',
      label: 'Resolution Center',
      active: true,
    },
    {
      path: 'financials',
      label: 'Financials',
      active: false,
    },
    {
      path: 'documents',
      label: 'Association Documents',
      active: true,
    },
    {
      path: 'exterior',
      label: 'Exterior Maintenance',
      active: false,
    },
    {
      path: 'interior',
      label: 'Interior Mainenance',
      active: false,
    },
    {
      path: 'board',
      label: 'Board of Directors',
      active: false,
    },
    {
      path: 'notes',
      label: 'Meeting Notes',
      active: false,
    },
    {
      path: 'profile',
      label: 'Edit Profile',
      active: false,
    },
  ];

  constructor(public userService: UserService) {}

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
    this.userIsAuthenticated = this.userService.getIsAuthenticated();
    this.listenForEvents();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      (isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        // if(!isAuthenticated) return;
      }
    );
  }

  onLogout() {
    this.userService.logout();
  }
}
