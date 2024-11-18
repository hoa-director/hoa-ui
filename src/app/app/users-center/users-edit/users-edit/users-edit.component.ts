import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
// -- services
import { UsersCenterService } from 'app/services/users-center.service';
// -- models

// -- interfaces
import { User } from "../../../../interfaces/user";
// -- css & Components
import { isLoading } from "../../../../shared/isLoading";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SuccessModalComponent } from "app/app/success-modal/success-modal.component";
import { FailureModalComponent } from "app/app/failure-modal/failure-modal.component";
import { error } from 'console';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent {
  userId: number; // pass user ID in here
  currentUser: any;
  editUserForm: FormGroup;
  allUsers: any;
  allRoles: any;
  isLoading = false;
  formIsDisabled: boolean = false
  userStatus: boolean = false; 
  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
  ]; 
  // allUserStatuses = [
  //   { id: 0, name: 'Inactive', description: 'User is inactive' },
  //   { id: 1, name: 'Active', description: 'User is active' },
  // ];

constructor(
  private UsersCenterService: UsersCenterService,
  private fb: FormBuilder,
  private dialog: MatDialog,
  private route: ActivatedRoute,
) {}


// -- PAGE LOAD
ngOnInit() {
  // this.listenForEvents();

  this.getParams();
  this.initEditUnitForm();
  this.getAllUsers();
  this.getOrganizationRoles();
  this.disableEnableForm();

  this.editUserForm.get('userId')?.valueChanges.subscribe(value => { // -- Listen for User Dropdown selection changes
    this.userId = value;
    this.getUser(this.userId); 
    this.disableForm();
  });

} 

// --  ACTIVATE/DEACTIVATE USER
onToggleChangeUser(): void {
  console.log('User status changed to:', this.userStatus);
  if(this.currentUser){
    console.log('CURRENT USER this.currentUser.id:', this.currentUser.id);
    this.UsersCenterService.updateUserStatus(this.currentUser.id, this.userStatus)
    .subscribe(
      (responseData: any) => {
        console.log('response subscribe');
        if (responseData.status === 'success') {
          console.log('RESPONSE:', responseData);
          this.openSuccessModal(); // -- need to import to use
          this.getUser(this.userId)
          this.disableEnableForm();
        } else if (responseData.status === 'failure') {
          console.log('RESPONSE', responseData);
          this.openFailureModal('User update failed.'); // Handle failure
        }
      }
    );
    
  } else {
    console.log('NO_CURRENT_USER_SELECTED');
  }
}


// -- GET PARAMS (IF THEY EXIST)
getParams(){
  this.route.paramMap.subscribe(params => {
    this.userId = +params.get('userId'); // Convert to number
    if (this.userId) {
      this.getUser(this.userId)
    }
  });
}

// -- INIT EDIT FORM ----- CHANGE TO USER FIELDS
initEditUnitForm() {
  this.editUserForm = this.fb.group({
    userId: [{value: this.userId, disabled: false}, [Validators.required]], 
    email: ['', [Validators.required, Validators.email]], 
    firstName: [''],
    lastName: [''],
    organization: [{value: this.associations[0].id, disabled: true}, [Validators.required] ], 
    role: [{disabled: false }, [Validators.required] ], 
    status: [{disabled: false }, [Validators.required] ], 
  });
}




// -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
disableEnableForm(){
  console.log('INSIDE_this.disableEnableForm();');
  if (!this.userId) {
    console.log('NO');  
    this.disableForm();
  } else {
    console.log('YES');  
    if(this.userStatus){
      this.enableForm();
    }
  }
}

disableForm(){
  // --  Don't enable organization dropdown
  this.editUserForm.get('email')?.disable();
  this.editUserForm.get('firstName')?.disable();
  this.editUserForm.get('lastName')?.disable();
  this.editUserForm.get('role')?.disable();
  this.editUserForm.get('status')?.disable();
  this.formIsDisabled= true;
}
enableForm(){
  console.log('YES');  
  this.editUserForm.get('email')?.enable();
  this.editUserForm.get('firstName')?.enable();
  this.editUserForm.get('lastName')?.enable();
  this.editUserForm.get('role')?.enable();
  this.editUserForm.get('status')?.enable();
  this.formIsDisabled = false;
}
// --  GET ALL ORGANIZATION ROLES  -- //
getOrganizationRoles() {
  this.UsersCenterService.fetchOrganizationRoles()
    .subscribe(
      (responseData: any) => {
        console.log('RESPONSE.DATA.ROLES:', responseData);
        this.allRoles = [...responseData];
        console.log('this.allRoles:', this.allRoles);
        // this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
}

// --  GET ALL UNITS FOR DROPDOWN -- //
getAllUsers(){
  isLoading(true);
  this.UsersCenterService.fetchUsers('')
  .subscribe((responseData: any) => {
    // console.log('RESPONSE.DATA:', responseData);
    this.allUsers = [...responseData];
    // console.log('this.allUsers:', this.allUsers);
    // this.cdr.detectChanges();
  }).add(() => {
    isLoading(false);
  });
}


// -- GET USER
getUser(userId: number) {
  // console.log('this.userId', userId);
  this.getOrganizationRoles();
  isLoading(true);
  this.UsersCenterService.fetchOneUser(userId)
  .subscribe((responseData: any) => {
    // console.log('RESPONSE.DATA:', responseData);
    this.currentUser = responseData;
    // console.log('this.currentUser after API:', this.currentUser);
    if (this.currentUser){
      this.updateEditUserForm(this.currentUser)
      this.userStatus = this.currentUser.deletedAt ? false : true
      console.log('userStatus', this.userStatus);
      this.disableEnableForm();
      if(!this.userStatus){
        console.log('YES_USER_STATUS:', this.userStatus);
        this.disableForm();
      }
    }
  }).add(() => {
    isLoading(false);
  });
}


// -- UPDATE EDIT FORM  ----- CHANGE TO USER FIELDS
updateEditUserForm(user: any) {
  this.editUserForm.patchValue({
    // userId: user.userId || '', //  DON'T Set this here.
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    // organization: user.organization || '', // Don't even try to change org. Not necessary at this point
    role: user.role,

  });
}


// -- SUBMIT USER CHANGES
saveUserChanges(){
  // console.log('this.currentUser', this.currentUser);
  // this.getUser(this.userId)
  if(this.editUserForm.valid){
    const formValues = this.editUserForm.value
    console.log('formValues.userId:', formValues.userId,);
    const userObj = {
      userId: formValues.userId,
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      number: formValues.number,
      role: formValues.role,
      status: formValues.status === 'true' ? true : (formValues.status === 'false' ? false : undefined), //  true/false
    } 

    console.log('formValues.status:', formValues.status);

    this.UsersCenterService
    .updateUser(userObj)
    .subscribe(
      (responseData: any) => {
        console.log('response subscribe');
        if (responseData.status === 'success') {
          console.log('RESPONSE:', responseData);
          this.openSuccessModal(); // -- need to import to use
        } else if (responseData.status === 'failure') {
          console.log('RESPONSE', responseData);
          this.openFailureModal('User update failed.'); // Handle failure
        }
      }
    );
  }
}

// -- CANCEL
onReset(): void {
  console.log('CANCEL');
  // this.editUnitForm.reset({
  //   associationId: this.associations[0].id, // required
  //   addressLineOne: '',
  //   // addressLineTwo: '',
  //   // city: '',
  //   // state: '',
  //   // zip: '',
  //   user: '', // required
  // });
}

openSuccessModal() {
  this.dialog.open(SuccessModalComponent, {
    data: { message: "User was updated successfully." }
  });
}

openFailureModal(message) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}



}
