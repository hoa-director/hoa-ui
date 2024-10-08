import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-center',
  templateUrl: './users-center.component.html',
  styleUrls: ['./users-center.component.css']
})
export class UsersCenterComponent implements OnInit {
  usersCenterLinks: any[];
  activeLink: string;

  constructor() {
    this.usersCenterLinks = [
      {
        name: "View Users",
        path: "users-view"
      },
      {
        name: "Add User",
        path: "users-add",
      },
      {
        name: "Edit User",
        path: "users-edit",
      }
    ];
  }

  ngOnInit() {
    this.activeLink = this.usersCenterLinks[0].name
  }


}
