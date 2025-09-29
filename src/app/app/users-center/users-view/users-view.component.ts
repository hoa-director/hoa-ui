import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../../services/user.service";  // -- SERVICE
import { UsersCenterService } from "../../../services/users-center.service";  // -- SERVICE
import { Router } from "@angular/router";

import { UserRow } from "../userrow";  // -- MODEL

// import { isLoading } from "app/shared/isLoading";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
  @ViewChild("usersTable") usersTable: MatTable<any>;

  // -------- USER MODEL --------
  // User: Array<{  
  //           id: number;
  //           first_name: string;
  //           last_name: string;
  //           unit: string;
  //           email: string;
  //           role: number;
  //           created_at: Date;
  //           deleted_at: Date; 
  //         }> = [];  

  public displayedColumns: string[] = [ // -- Table Columns
    // 'id', 
    'name',
    'association',
    'unit',
    'email', 
    'role', 
    // 'created_at', 
    // 'deleted_at',
    'edit-button', 
  ];

public userRows: UserRow[] = []; // -- ALL Users (multiple)
public currentUser: any;  // SINGLE User

searchUsersForm: FormGroup;
inputString: string = '';


constructor(
  private router: Router,
  private userService: UserService,  // -- for checking USER authentication, I THINK..
  public UsersCenterService: UsersCenterService, // -- USERS SERVICE
  private fb: FormBuilder,

  ) {
  this.searchUsersForm = this.fb.group({
    inputText: ['']
  })
}

  ngOnInit() {
    // const associationId = parseInt(sessionStorage.getItem('associationId'));
    this.fetchUsers(this.inputString);
    // this.users.fetchUsers.subscribe(() => {
    //   this.init();
    // });
  }

  fetchUsers(inputString) {
    // isLoading(true);
    this.UsersCenterService.fetchUsers(inputString || '')
    .subscribe((responseData: any) => {
      this.userRows = responseData.map(user => {
        if (user.units.length === 0) { // <-- if units exits, but is empty array[], add default string
          user.units = [{addressLineOne: "—"}] 
        }
        return user;
      }
      )
        // [...responseData]; // -- need to [...loop] to make the data structure iterable in the table component. 
        // console.log('this.userRows:', this.userRows); // -- Check STATE 
    }, (error) => {
      console.log('fetchUsers() ERROR', error);
    }
  )
  .add(() => {
    // isLoading(false);
  });
  }

  selectUser(UserRow: UserRow) { // -- Select one user
    this.currentUser = UserRow;
    // console.log('UserRow:', UserRow);
    // const userDialogueRef = this.userDiaolgue.open()
  }

  onInputChange() { // -- dynamically update inputString STATE, then Search.
      this.fetchUsers(this.inputString)
  }
  
  onReset(): void { // -- Clear Search Field Button
    // this.searchUsersForm.reset(); // did commenting this out fix the double firing issue???
    this.inputString = ''
    // this.fetchUsers('') // did commenting this out fix the double firing issue???
  }

  goToAddUser() {
    this.router.navigate(['/home/user-center/add']);
  }

  editUser(userId: number) {
    if(userId){
      this.router.navigate(['/home/user-center/edit', userId]); // Navigate to the edit page with unitId
    }
  }
}
