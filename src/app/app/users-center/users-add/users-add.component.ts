import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'app/services/user.service';
import { UsersService } from "../../../services/users.service";  // -- SERVICE
import { User } from "../../../../app/interfaces/user";

// interface User {
//   email: String;
//   firstName: String | null;
//   lastName: String | null;
//   password: String;
//   number: Number;
//   role: Number | null;
// }

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  // public email: String = ''; 
  // public password: String = 'test'; // -- ADD DEFAULT -- TO NAME?
  // public number: Number = 1; // -- ADD DEFAULT TO current association
  // public role: Number = 25; // -- basic user role
  // public firstName: String = ''; 
  // public lastName: String = ''; 

  public currentUser;  // SINGLE User
  
  addUserForm: FormGroup;
  inputString: String = '';  

  constructor(
    // --  SERVICES
    private userService: UserService,
    private usersService: UsersService,

    private fb: FormBuilder,
  ) {
    // this.addUsersForm = this.formBuilder.group({
    //   inputText: ['']
    // })
  }

ngOnInit(): void {
  console.log('On Init');
  this.addUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], // Ensure Validators.email is included
    firstName: [''],
    lastName: [''],
    password: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/)]], // -- ADD REQUIRED
    // number: [''], // -- ADD REQUIRED
    // role: [''], // -- ADD REQUIRED
  });
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addUserForm.reset();
  // this.email = ''

}

//       test1234@gmail.com

// -- ADD USER -- //
addUser(): void { // -- WORKS 
  // console.log('addUserForm:', this.addUserForm.value); // -- Check form
  if (this.addUserForm.valid) {
    console.log('ADD USER FORM VALID');
    const formValues = this.addUserForm.value;
    let user: User = {
      email: formValues.email,
      firstName: formValues.firstName, // formValues.firstName,
      lastName: formValues.lastName, // formValues.lastName,
      password: formValues.password,  //formValues.password,
      number: 1, //Number(formValues.number),
      role: 25, //Number(formValues.role),
    }
    console.log('USER Sent:', user);
    this.usersService.createUser(user).subscribe((responseData: any) => {
      // console.log(responseData);
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
  } else {
    console.log('ADD USER FORM NOT VALID');
  }




}






}
