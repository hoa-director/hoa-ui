import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'app/services/user.service';
import { UsersService } from "../../../services/users.service";  // -- SERVICE

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
  public userEmail: String = ''; 
  public userFirstName: String = ''; 
  public userLastName: String = ''; 
  public currentUser;  // SINGLE User
  
  addUsersForm: FormGroup;
  inputString: string = '';  






  constructor(
    // --  SERVICES
    private userService: UserService,
    private usersService: UsersService,

    private formBuilder: FormBuilder,
  ) {
    // this.addUsersForm = this.formBuilder.group({
    //   inputText: ['']
    // })
  }

ngOnInit() {
  console.log('On Init');
}

addUser(): void { // -- WORKS 
  console.log('Add user');
  const userObj =  {
    // id: nextUserId,
    email: 'test5@gmail.com',
    password: 'test', 
    number: 1,
    role: 99,
    firstName: 'dale15',
    lastName: 'Earnhardt',
  }

  this.usersService.createUser(userObj).subscribe((responseData: any) => {
    console.log(responseData);
    if(responseData){
      console.log('IF responseData NOT Null');
    } else {
      console.log('ELSE responseData NULL');
      alert('Unable to create User.')
    }
  }, (error) => {
    console.log('ADD-USER ERROR:', error);
  }
)

}






}
