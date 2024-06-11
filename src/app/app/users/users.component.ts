import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatLegacyTable as MatTable } from "@angular/material/legacy-table";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";

import { UserService } from "../../services/user.service";  // -- SERVICE
import { UsersService } from "../../services/users.service"  // -- SERVICE

import { User } from "./user";  // -- MODEL

import { isLoading } from "app/shared/isLoading";
import { FormGroup } from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild("usersTable") usersTable: MatTable<any>;


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

// public userRows = 
public userRows: User[] = [];

public currentUser;

public displayedColumns: string[] = [
  'id', 
  'first_name', 
  'last_name', 
  'email', 
  'role', 
  'created_at', 
  'deleted_at',
  'edit-button', 
];

searchUsersForm: FormGroup;




constructor(
  private userService: UserService,  // -- for checking user authentication, I THINK..
  public usersService: UsersService, // -- SERVICE
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
        this.userRows = [...responseData]; // -- need to [...loop] to make the data structure iterable in the table component. 
        console.log('responseData:', responseData); // -- Console Log WORKS
        console.log('this.userRows:', this.userRows); // -- Console Log WORKS
    }, (error) => {
      console.log('fetchUsers() CLIENT ERROR', error); // -- Console Log WORKS
    }
  )
  .add(() => {
    isLoading(false);
  });
  }

  selectUser(user: User) {
    this.currentUser = user;
    console.log('user:', user);
    // const userDialogueRef = this.userDiaolgue.open()
  }

  onSearch(): void {
    console.log('onSearch');
  }


}
