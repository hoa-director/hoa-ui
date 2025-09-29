import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// -- services
import { UsersCenterService } from "../../../services/users-center.service";
import { UserService } from "../../../services/user.service";
// -- models

// -- interfaces
import { User } from "../../../../app/interfaces/user";
// -- css & Components
// import { isLoading } from "../../../shared/isLoading";
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
  showNeighborhoodRequiredMsg: boolean = false;
  constructor(
    // --  SERVICES
    private usersCenterService: UsersCenterService,
    private userService: UserService,
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
    role: [{ value: '', disabled: true }, [Validators.required]],  
    address: [{ value: '', disabled: true }],
  });

    // enable Role and Address only after Neighborhood is selected
  this.addUserForm.get('organization')?.valueChanges.subscribe(value => {
    if (value) {
      this.addUserForm.get('role')?.enable();
      this.addUserForm.get('address')?.enable();
    } else {
      this.addUserForm.get('role')?.reset();
      this.addUserForm.get('role')?.disable();
      this.addUserForm.get('address')?.reset();
      this.addUserForm.get('address')?.disable();
    }
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

checkIfNeighborhoodSelected() {
  const orgSelected = this.addUserForm.get('organization')?.value;
  if (!orgSelected) {
    this.showNeighborhoodRequiredMsg = true;
    setTimeout(() => this.showNeighborhoodRequiredMsg = false, 4000);
  }
}

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
  this.router.navigate(['/home/user-center/view']);
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addUserForm.reset();
  this.addUserForm.markAsPristine();
  this.addUserForm.markAsUntouched();
  this.allRoles = [];
  this.addresses = [];
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
      unitId: formValues.address || null,
      phoneOneLabel: null,
      phoneOneNumber: null,
      phoneTwoLabel: null,
      phoneTwoNumber: null
    }

    this.usersCenterService
    .createUser(user)
    .subscribe(
      (responseData: any) => { // server will send status of 200, 400, or 500
        if(responseData.status === 400){ // email already exists
          this.openFailureModal('This email already exists.'); 
        } else if (responseData.status === 500) { // error
          this.openFailureModal('Unable to create new user. Please try again later.');
        } else { // success
          this.openSuccessModal();
          this.onReset(); // -- Reset Form
          this.userService.requestToken(user.email); // email new user a password reset link
          this.router.navigate(['/home/user-center/view']);
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
