import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedUserId: number;
  editUserForm: FormGroup;
  // allUsers: any;
  allRoles: any[] = [];
  isLoading = false;
  formIsDisabled: boolean = false
  // userStatus: boolean = false; 
  currentAssociationId: number;
  associations: any = [];
  addresses: any[] = [];

  // allUserStatuses = [
  //   { id: 0, name: 'Inactive', description: 'User is inactive' },
  //   { id: 1, name: 'Active', description: 'User is active' },
  // ];

constructor(
  private usersCenterService: UsersCenterService,
  private fb: FormBuilder,
  private dialog: MatDialog,
  private route: ActivatedRoute,
  private router: Router
) {}


// -- PAGE LOAD
ngOnInit() {
  // this.listenForEvents();

  this.getParams();
  this.initEditUserForm();
  // this.getAllUsers();
  this.usersCenterService.getAllAssociations().subscribe(associations => {
    this.associations = associations;
  });
  // this.disableEnableForm();

  // // userId is not a form field
  // this.editUserForm.get('userId')?.valueChanges.subscribe(value => { // -- Listen for User Dropdown selection changes
  //   this.userId = value;
  //   this.getUser(this.userId); 
  //   this.disableForm();
  // });

} 

// // --  ACTIVATE/DEACTIVATE USER
// onToggleChangeUser(): void {
//   if(this.currentUser){
//     console.log('CURRENT USER this.currentUser.id:', this.currentUser.id);
//     this.UsersCenterService.updateUserStatus(this.currentUser.id, this.userStatus)
//     .subscribe(
//       (responseData: any) => {
//         console.log('response subscribe');
//         if (responseData.status === 'success') {
//           console.log('RESPONSE:', responseData);
//           this.openSuccessModal(); // -- need to import to use
//           this.getUser(this.userId)
//           this.disableEnableForm();
//         } else if (responseData.status === 'failure') {
//           console.log('RESPONSE', responseData);
//           this.openFailureModal('User update failed.'); // Handle failure
//         }
//       }
//     );
    
//   } else {
//     console.log('NO_CURRENT_USER_SELECTED');
//   }
// }


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
initEditUserForm() {
  this.editUserForm = this.fb.group({
    // userId: [{value: this.userId}, [Validators.required]], 
    email: ['', [Validators.required, Validators.email]], 
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    organization: ['', [Validators.required]], 
    role: ['', [Validators.required] ], 
    // status: ['', [Validators.required] ],
    address: [''],
  });
}




// // -- DISABLE/ENABLE FORM -- On INIT and user dropdown selection change
// disableEnableForm(){
//   if (!this.userId) {
//     this.disableForm();
//   } else {
//     if(this.userStatus){
//       this.enableForm();
//     }
//   }
// }

disableForm(){
  this.editUserForm.get('email')?.disable();
  this.editUserForm.get('firstName')?.disable();
  this.editUserForm.get('lastName')?.disable();
  this.editUserForm.get('organization')?.disable();
  this.editUserForm.get('role')?.disable();
  this.editUserForm.get('address')?.disable();
  // this.editUserForm.get('status')?.disable();
  this.formIsDisabled= true;
}
enableForm(){
  console.log('YES');  
  this.editUserForm.get('email')?.enable();
  this.editUserForm.get('firstName')?.enable();
  this.editUserForm.get('lastName')?.enable();
  this.editUserForm.get('organization')?.enable();
  this.editUserForm.get('role')?.enable();
  this.editUserForm.get('address')?.enable();
  // this.editUserForm.get('status')?.enable();
  this.formIsDisabled = false;
}
// --  GET ALL ORGANIZATION ROLES  -- //
getOrganizationRoles(associationId: number) {
  this.usersCenterService.fetchRolesByAssociation(associationId)
    .subscribe(
      (responseData: any) => {
        this.allRoles = [...responseData];
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
}

getVacantUnits(associationId: number) {
  this.usersCenterService.fetchVacantUnits(associationId)
    .subscribe((response) => {
      this.addresses = response as any[];
      if (this.currentUser?.units.length > 0) {
        this.addresses = [this.currentUser.units[0], ...this.addresses];
      }
    },
  (error) => {
    console.error('Error fetching vacant units:', error);
  });
}

handleAssociationChange(associationId: number) {
  this.currentAssociationId = associationId;
  this.getOrganizationRoles(associationId);
  this.getVacantUnits(associationId);
}

// // --  GET ALL UNITS FOR DROPDOWN -- //
// getAllUsers(){
//   isLoading(true);
//   this.UsersCenterService.fetchUsers('')
//   .subscribe((responseData: any) => {
//     // console.log('RESPONSE.DATA:', responseData);
//     this.allUsers = [...responseData];
//     // console.log('this.allUsers:', this.allUsers);
//     // this.cdr.detectChanges();
//   }).add(() => {
//     isLoading(false);
//   });
// }


// -- GET USER
getUser(userId: number) {
  // console.log('this.userId', userId);
  this.selectedUserId = userId;
  isLoading(true);
  this.usersCenterService.fetchOneUser(userId)
  .subscribe((responseData: any) => {
    // console.log('RESPONSE.DATA:', responseData);
    this.currentUser = responseData;
    this.handleAssociationChange(responseData.organization);
    // console.log('this.currentUser after API:', this.currentUser);
    if (this.currentUser){
      this.updateEditUserForm(this.currentUser)
      // this.userStatus = this.currentUser.deletedAt ? false : true
      // console.log('this_currentUser_deletedAt', this.currentUser.deletedAt);
      // console.log('userStatus', this.userStatus);
      // this.disableEnableForm();
      // if(!this.userStatus){
      //   console.log('YES_USER_STATUS:', this.userStatus);
      //   this.disableForm();
      // }
    }
  }).add(() => {
    isLoading(false);
  });
}


// -- UPDATE EDIT FORM  ----- CHANGE TO USER FIELDS
updateEditUserForm(user: any) {
  this.editUserForm.patchValue({
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    organization: user.organization || '',
    role: user.role || '',
    address: user.units[0]?.id || '',
  });
}


// -- SUBMIT USER CHANGES
saveUserChanges(){
  if(this.editUserForm.valid){
    const formValues = this.editUserForm.value
    // console.log('formValues.userId:', formValues.userId,);
    const userObj = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      number: formValues.organization,
      role: formValues.role,
      // status: formValues.status === 'true' ? true : (formValues.status === 'false' ? false : null), //  true/false
    } 

    const unitId = formValues.address ? formValues.address : null;

    // console.log('formValues.status:', formValues.status);

    this.usersCenterService
    .updateUser(this.selectedUserId, unitId, userObj)
    .subscribe(
      (responseData: any) => {
        // console.log('response subscribe');
        if (responseData.status === 'success') {
          // console.log('RESPONSE:', responseData);
          this.openSuccessModal("User was successfully updated.");
          this.router.navigate(["/home/users-center/users-view"]);
        } else if (responseData.status === 'failure') {
          // console.log('RESPONSE', responseData);
          this.openFailureModal("Unable to update user. Please try again later.");
        }
      }
    );
  }
}

onCancel() {
  this.router.navigate(["/home/users-center/users-view"]);
}

onDelete() {
  const confirmed = window.confirm("Are you sure you want to permanently delete this user?");
  if (confirmed) {
    this.usersCenterService.deleteUser(this.userId).subscribe((response: any) => {
      if (response.ok) {
        this.openSuccessModal("Successfully deleted user.");
        this.router.navigate(["/home/users-center/users-view"]);
      } else {
        this.openFailureModal("Failed to delete user. Please try again later.");
      }
    });
  } else { // if user clicks Cancel
    return;
  }
}

openSuccessModal(message: string) {
  this.dialog.open(SuccessModalComponent, {
    data: { message }
  });
}

openFailureModal(message: string) {
  this.dialog.open(FailureModalComponent, {
    data: { message }
  })
}



}
