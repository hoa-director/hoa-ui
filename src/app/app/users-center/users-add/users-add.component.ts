import { Component, OnInit, ViewChild } from '@angular/core';
// -- services
import { UserService } from 'app/services/user.service';
import { UsersCenterService } from "../../../services/users-center.service";  // -- SERVICE
// -- models

// -- interfaces
import { User } from "../../../../app/interfaces/user";
// -- css & Components
import { isLoading } from "../../../shared/isLoading";
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from 'app/app/success-modal/success-modal.component';
import { FailureModalComponent } from 'app/app/failure-modal/failure-modal.component';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {  
  addUserForm: FormGroup;
  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
    {id: 2, associationName: 'test'}
  ];
  constructor(
    // --  SERVICES
    private userService: UserService,
    private UsersCenterService: UsersCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog
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
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/)]], 
    organization: [{value: this.associations[0].id, disabled: true}, [Validators.required] ], 
    role: [{value: '50', disabled: false }, [Validators.required] ], 
  });
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addUserForm.reset({
    organization: {value: this.associations[0].id, disabled: true}, 
    role: {value: '25', disabled: false }
  });
  Object.keys(this.addUserForm.controls).forEach(key => {
    this.addUserForm.get(key)?.setErrors(null);
    // this.addUserForm.get(key)?.markAsPristine();
    // this.addUserForm.get(key)?.markAsUntouched();
  });
}


// -- ADD USER -- //
addUser(): void { // -- WORKS 
  // console.log('addUserForm:', this.addUserForm.value); // -- Check form BEFORE validating.
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
    // console.log('USER Sent:', user); // -- Check form BEFORE sending.

    this.UsersCenterService
    .createUser(user)
    .subscribe(
      (responseData: any) => {
        console.log('SUBSCRIBE');
      if(responseData){ // -- If Response
        console.log('IF responseData NOT Null:', responseData);
        this.openSuccessModal(); // -- tell user it worked
        this.onReset(); // -- clear form
      } else { // -- If NO Response
        console.log('ELSE responseData NULL:', responseData);
        this.openFailureModal('User already exists.'); // -- tell user it did NOT work
        // alert('User with that email already exist.')
      }
    }, (error) => { // -- If Error
      console.log('ADD-USER ERROR:', error);
      this.openFailureModal('There was an error when trying to create a new user.'); // -- tell user it did NOT work
    }
  )
  } else { // -- If FORM NOT VALID
    console.log('ADD USER FORM NOT VALID');
  }
}


openSuccessModal() {
  this.dialog.open(SuccessModalComponent, {
    data: { message: "User was created successfully." }
  });
}

openFailureModal(message) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}

}
