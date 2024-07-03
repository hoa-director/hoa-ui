import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'app/services/user.service';
import { UsersService } from "../../../services/users.service";  // -- SERVICE
import { User } from "../../../../app/interfaces/user";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {  
  addUserForm: FormGroup;

  constructor(
    // --  SERVICES
    private userService: UserService,
    private usersService: UsersService,

    private fb: FormBuilder,
  ) {}

ngOnInit(): void {
  // const userOrganizations: any = this.userService.getUserAssociations();
  // if(userOrganizations && userOrganizations.length > 0 ){
  //   const org = userOrganizations[0]
  //   console.log('org', org);
  // }
  // console.log('userOrganizations', userOrganizations[0]);

  this.addUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    firstName: [''],
    lastName: [''],
    password: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/)]], 
    organization: [{value: '2', disabled: true}, [Validators.required] ], 
    role: [{value: '25', disabled: false }, [Validators.required] ], 
  });
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addUserForm.reset({
    organization: {value: '2', disabled: true}, 
    role: {value: '25', disabled: false }
  });
}

//       test1234@gmail.com

// -- ADD USER -- //
addUser(): void { // -- WORKS 
  console.log('addUserForm:', this.addUserForm.value); // -- Check form
  if (this.addUserForm.valid) {
    this.addUserForm.get('organization').enable();
    // console.log('ADD USER FORM VALID');
    const formValues = this.addUserForm.value;
    // console.log('this.addUserForm.value', this.addUserForm.value);
    let user: User = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,  
      number: formValues.organization, //Number(formValues.number),
      role: formValues.role, //Number(formValues.role),
    }
    this.addUserForm.get('organization').disable();
    // console.log('USER Sent:', user);
    this.usersService.createUser(user).subscribe((responseData: any) => {
      // console.log(responseData);
      if(responseData){
        // console.log('IF responseData NOT Null');
      } else {
        // console.log('ELSE responseData NULL');
        alert('User with that email already exist.')
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
