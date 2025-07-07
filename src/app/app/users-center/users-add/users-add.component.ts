import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// -- services
import { UsersCenterService } from "../../../services/users-center.service";  
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
  allRoles: any[] = [];
  associations: any = [];
  addresses: any[] = [];
  constructor(
    // --  SERVICES
    private usersCenterService: UsersCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) {}

ngOnInit(): void {
  this.usersCenterService.getAllAssociations().subscribe(associations => {
    this.associations = associations;
  });
  
  this.addUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/)]], 
    organization: ['', [Validators.required]], 
    role: ['', [Validators.required] ], 
    address: [''],
  });
}


// --  GET ALL ORGANIZATION ROLES  -- //
// getOrganizationRoles() {
//   this.usersCenterService.fetchOrganizationRoles()
//     .subscribe(
//       (responseData: any) => {
//         console.log('RESPONSE.DATA.ROLES:', responseData);
//         this.allRoles = [...responseData];
//         console.log('this.allRoles:', this.allRoles);
//         // this.cdr.detectChanges();
//       },
//       (error) => {
//         console.error('Error fetching roles:', error);
//       }
//     );
// }

onAssociationChange(associationId: number) {
  this.usersCenterService.fetchRolesByAssociation(associationId).subscribe(response => {
    this.allRoles = response as any[];
    this.allRoles.forEach(role => {
      if (role.title === 'Owner') {
        this.addUserForm.get('role')?.setValue(role.id); // -- Set default role to Owner
      }
    });
  });

  this.usersCenterService.fetchVacantUnits(associationId).subscribe(response => {
    this.addresses = response as any[];
  });
}

onCancel(): void {
  this.onReset();
  this.router.navigate(['/home/users-center/users-view']);
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addUserForm.reset();
  this.addUserForm.markAsPristine();
  this.addUserForm.markAsUntouched();
  Object.keys(this.addUserForm.controls).forEach(key => {
    this.addUserForm.get(key)?.setErrors(null);
  });
}


// -- ADD USER -- //
addUser(): void {
  if (this.addUserForm.valid) {
    const formValues = this.addUserForm.value;
    let user: User = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,  
      number: formValues.organization, //Number(formValues.number),
      role: formValues.role, //Number(formValues.role),
      unitId: formValues.address,
      phoneOneLabel: null,
      phoneOneNumber: null,
      phoneTwoLabel: null,
      phoneTwoNumber: null
    }

    this.usersCenterService
    .createUser(user)
    .subscribe(
      (responseData: any) => {
        if(responseData.status === 400){ // email already exists
          this.openFailureModal('This email already exists.'); 
        } else if (responseData.status === 500) { // error
          this.openFailureModal('Unable to create new user. Please try again later.');
        } else { // success
          this.openSuccessModal();
          this.onReset(); // -- Reset Form
        }
      }, (error) => { // -- If Error
        console.log('ADD-USER ERROR:', error);
        this.openFailureModal('Unable to create new user. Please try again later.');
      }
    )
  } else { // -- If FORM NOT VALID
    this.openFailureModal('One or more fields are invalid.');
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
