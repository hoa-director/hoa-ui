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

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent {
  userId: number; // pass unit ID in here
  currentUser: any;
  editUserForm: FormGroup;
  isLoading = false;
  associations = [
    {
      id: sessionStorage.getItem("associationId").toString(), 
      associationName: sessionStorage.getItem("associationName").toString()
    },
  ]; 
  roles = [
    {role: 25, roleName: 'Unit Owner',},
    {role: 50, roleName: 'Admin'},
    {role: 75, roleName: 'President'},
    {role: 100,roleName: 'Master User'},
    {role: 125,roleName: 'TEST Role'},
  ]

constructor(
  private UsersCenterService: UsersCenterService,
  private fb: FormBuilder,
  private dialog: MatDialog,
  private route: ActivatedRoute
) {}


// -- PAGE LOAD
ngOnInit() {
  // this.listenForEvents();

  this.getParams();
  this.initEditUnitForm();

  this.editUserForm.get('userId')?.valueChanges.subscribe(value => { // -- Listen for User Dropdown selection changes
    this.userId = value;
    this.getUser(this.userId) 
  });
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
  });
}

// -- GET USER
getUser(userId: number) {
  console.log('this.userId', userId);
  isLoading(true);
  this.UsersCenterService.fetchOneUser(userId)
  .subscribe((responseData: any) => {
    console.log('RESPONSE.DATA:', responseData);
    this.currentUser = responseData;
    console.log('this.currentUser after API:', this.currentUser);
    if (this.currentUser){
      this.updateEditUserForm(this.currentUser)
    }
  }).add(() => {
    isLoading(false);
  });
}


// -- UPDATE EDIT FORM  ----- CHANGE TO USER FIELDS
updateEditUserForm(user: any) {
  this.editUserForm.patchValue({
    // userId: user.userId || '',
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    // organization: user.organization || '', // Don't even try to change org. Not necessary at this point
    role: user.role,
  });
}


// -- SUBMIT USER
updateUser(){
  console.log('ADD UNIT!');
  // this.getUser(this.userId)
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








}
