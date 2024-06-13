import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatLegacyTable as MatTable } from "@angular/material/legacy-table";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";

import { UserService } from "../../services/user.service";  // -- SERVICE
import { UsersService } from "../../services/users.service"  // -- SERVICE

import { UserRow } from "./userrow";  // -- MODEL

import { isLoading } from "app/shared/isLoading";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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


public userRows: UserRow[] = []; // -- ALL Users (multiple)

public currentUser;  // SINGLE User

public displayedColumns: string[] = [
  'id', 
  'first_name', 
  'last_name', 
  'unit',
  'email', 
  'role', 
  'created_at', 
  'deleted_at',
  'edit-button', 
];

searchUsersForm: FormGroup;
inputName: string = '';



constructor(
  private userService: UserService,  // -- for checking user authentication, I THINK..
  public usersService: UsersService, // -- SERVICE

  private fb: FormBuilder,

  ) {
  //   this.searchUsersForm = new FormGroup({
  //     email: new FormControl()
  // });
  this.searchUsersForm = this.fb.group({
    inputText: ['']
  })
}

  ngOnInit() {
    // const associationId = parseInt(sessionStorage.getItem('associationId'));
    this.fetchUsers(this.inputName);
    // this.users.fetchUsers.subscribe(() => {
    //   this.init();
    // });
  }

  fetchUsers(inputName) {
    // console.log('associationId:', associationId );
    console.log('ngOnInit()/fetchUsers()'); // -- Console Log WORKS
    isLoading(true);
    this.usersService.fetchUsers(inputName).subscribe((responseData: any) => {
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

  selectUser(UserRow: UserRow) {
    this.currentUser = UserRow;
    console.log('UserRow:', UserRow);
    // const userDialogueRef = this.userDiaolgue.open()
  }

  onInputChange() { // -- dynamically searches as you type
    console.log('this.inputName:', this.inputName );
      this.fetchUsers(this.inputName)
  }

  onSearch(): void { // -- Only fires when Submit Button is clicked
    if (this.searchUsersForm.valid) { 
      this.fetchUsers(this.inputName)
      } else {
        alert('You did not enter anything to search for.')
    }
  }


}
