import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatLegacyTable as MatTable } from "@angular/material/legacy-table";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";

import { UserService } from "../../../services/user.service";  // -- SERVICE
import { UsersService } from "../../../services/users.service";  // -- SERVICE

import { UserRow } from "../userrow";  // -- MODEL

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

  public displayedColumns: string[] = [ // -- Table Columns
    // 'id', 
    'first_name', 
    'last_name', 
    'unit',
    'email', 
    'role', 
    'created_at', 
    'deleted_at',
    'edit-button', 
  ];

public userRows: UserRow[] = []; // -- ALL Users (multiple)
public currentUser;  // SINGLE User

searchUsersForm: FormGroup;
inputString: string = '';


constructor(
  private userService: UserService,  // -- for checking USER authentication, I THINK..
  public usersService: UsersService, // -- USERS SERVICE
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
    isLoading(true);
    this.usersService.fetchUsers(inputString || '').subscribe((responseData: any) => {
        this.userRows = responseData.map(user => {
          if (user.units.length === 0) { // <-- if units exits, but is empty array[], add default string
            user.units = [{unit: "No Assigned Unit"}] 
          }
          return user;
        }
      )
        // [...responseData]; // -- need to [...loop] to make the data structure iterable in the table component. 
        // console.log('responseData:', responseData); // -- Check RESPONSE  
        // console.log('this.userRows:', this.userRows); // -- Check STATE 
    }, (error) => {
      console.log('fetchUsers() ERROR', error); // -- Console Log WORKS
    }
  )
  .add(() => {
    isLoading(false);
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
    this.searchUsersForm.reset();
    this.inputString = ''
    this.fetchUsers('')
  }


  
  // addUser(): void {
  //   console.log('ADD-USER-BUTTON');
  //   // ---- ADD userObj{} HERE TO TEST ---- 
  //   const userObj =  {
  //     email: 'test5@gmail.com',
  //     password: 'test', 
  //     number: 1,
  //     role: 99,
  //     firstName: 'dale15',
  //     lastName: 'Earnhardt',
  //   }

  //   this.usersService.createUser(userObj).subscribe((responseData: any) => {
  //     console.log('addUser SUBSCRIBE');
  //     console.log('responseData:', responseData); // -- Console Log WORKS
  //     if(responseData){
  //       console.log('IF responseData NOT Null');
  //     } else {
  //       console.log('ELSE responseData NULL');
  //       alert('Unable to create User.')
  //     }
  //     }, (error) => {
  //       console.log('ADD-USER ERROR:', error);
  //     }
  //   )
  //   .add(() => {
  //     isLoading(false);
  //     this.fetchUsers(this.inputString)
  //   });
  // } 





}
