import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatLegacyTable as MatTable } from "@angular/material/legacy-table";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";

import { UserService } from "../../services/user.service";  // -- SERVICE
import { UsersService } from "../../services/users.service"  // -- SERVICE

import { User } from "./user";  // -- MODEL

import { isLoading } from "app/shared/isLoading";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // @ViewChild("usersTable") usersTable: MatTable<any>;


  // -------- USER MODEL --------
  User: Array<{  
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: number;
    created_at: Date;
    deleted_at: Date; 
  }> = [];  

public userRows: User[] = [];
public currentUser;

// public displayedColumns: string[] = [
//   'id', 
//   'first_name', 
//   'last_name', 
//   'email', 
//   'role', 
//   'created_at', 
//   'deleted_at' 
// ];

constructor(
  private userService: UserService,  // -- for checking user authentication, I THINK..
  public usersService: UsersService,
) {}

  ngOnInit() {
    console.log('ngOnInit'); // -- Console Log WORKS
    this.fetchUsers();
    // this.users.fetchUsers.subscribe(() => {
    //   this.init();
    // });
  }

  fetchUsers() {
    console.log('ngOnInit()/fetchUsers()'); // -- Console Log WORKS
    isLoading(true);
    this.usersService.fetchUsers().subscribe((responseData: any) => {
      console.log('SUBSCRIBE'); // -- Console Log WORKS
        this.userRows = [...responseData];
        console.log('responseData:', responseData); // -- Console Log WORKS
        console.log('this.userRows:', this.userRows); // -- Console Log WORKS
    }, (error) => {
      console.log('fetchUsers() CLIENT ERROR', error); // -- Console Log WORKS
    }
  )
  .add(() => {
    isLoading(false);
  });
    // this.users.fetchUsers.subscribe((response) => { 
    //   this.currentUser = response.currentUser;

  }
}
