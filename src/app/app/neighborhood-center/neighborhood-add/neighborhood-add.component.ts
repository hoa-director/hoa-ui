import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// -- services
import { NeighborhoodCenterService } from "../../../services/neighborhood-center.service";  
// -- models

// -- interfaces
//import { User } from "../../../../app/interfaces/user";
// -- css & Components
import { isLoading } from "../../../shared/isLoading";
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from 'app/app/success-modal/success-modal.component';
import { FailureModalComponent } from 'app/app/failure-modal/failure-modal.component';


@Component({
  selector: 'app-neighborhood-add',
  templateUrl: './neighborhood-add.component.html',
  styleUrls: ['./neighborhood-add.component.css']
})
export class NeighborhoodAddComponent implements OnInit {  
  addNeighborhoodForm: FormGroup;
  allRoles: any[] = [];
  associations: any = [];
  addresses: any[] = [];
  showNeighborhoodRequiredMsg: boolean = false;
  constructor(
    // --  SERVICES
    private neighborhoodCenterService: NeighborhoodCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) {}

ngOnInit(): void {
  this.neighborhoodCenterService.getAllAssociations().subscribe(associations => {
    this.associations = associations;
  });
  
  this.addNeighborhoodForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/)]], 
    organization: ['', [Validators.required]], 
    role: [{ value: '', disabled: true }, [Validators.required]],  
    address: [{ value: '', disabled: true }],
  });

    // enable Role and Address only after Neighborhood is selected
  this.addNeighborhoodForm.get('organization')?.valueChanges.subscribe(value => {
    if (value) {
      this.addNeighborhoodForm.get('role')?.enable();
      this.addNeighborhoodForm.get('address')?.enable();
    } else {
      this.addNeighborhoodForm.get('role')?.reset();
      this.addNeighborhoodForm.get('role')?.disable();
      this.addNeighborhoodForm.get('address')?.reset();
      this.addNeighborhoodForm.get('address')?.disable();
    }
  });
}

checkIfNeighborhoodSelected() {
  const orgSelected = this.addNeighborhoodForm.get('organization')?.value;
  if (!orgSelected) {
    this.showNeighborhoodRequiredMsg = true;
    setTimeout(() => this.showNeighborhoodRequiredMsg = false, 4000);
  }
}

onAssociationChange(associationId: number) {
  this.neighborhoodCenterService.fetchRolesByAssociation(associationId).subscribe(response => {
    this.allRoles = response as any[];
    this.allRoles.forEach(role => {
      if (role.title === 'Owner') {
        this.addNeighborhoodForm.get('role')?.setValue(role.id); // -- Set default role to Owner
      }
    });
  });

  this.neighborhoodCenterService.fetchVacantUnits(associationId).subscribe(response => {
    this.addresses = response as any[];
  });
}

onCancel(): void {
  this.onReset();
  this.router.navigate(['/home/neighborhood-center/neighborhood-view']);
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addNeighborhoodForm.reset();
  this.addNeighborhoodForm.markAsPristine();
  this.addNeighborhoodForm.markAsUntouched();
  this.allRoles = [];
  this.addresses = [];
}


addNeighborhood(): void {
  if (this.addNeighborhoodForm.valid) {
    const formValues = this.addNeighborhoodForm.value;
    // let user: User = {
    let neighborhood = {}
    //   email: formValues.email,
    //   firstName: formValues.firstName,
    //   lastName: formValues.lastName,
    //   password: formValues.password,  
    //   number: formValues.organization, //Number(formValues.number),
    //   role: formValues.role, //Number(formValues.role),
    //   unitId: formValues.address,
    //   phoneOneLabel: null,
    //   phoneOneNumber: null,
    //   phoneTwoLabel: null,
    //   phoneTwoNumber: null
    // }

    this.neighborhoodCenterService
    .createNeighborhood(neighborhood)
    .subscribe(
      (responseData: any) => { // server will send status of 200, 400, or 500
        if(responseData.status === 400){ // email already exists
          this.openFailureModal('This email already exists.'); 
        } else if (responseData.status === 500) { // error
          this.openFailureModal('Unable to create new neighborhood. Please try again later.');
        } else { // success
          this.openSuccessModal();
          this.onReset(); // -- Reset Form
          this.router.navigate(['/home/neighborhood-center/neighborhood-view']);
        }
      }, (error) => { // -- If Error
        console.log('ADD-neighborhood ERROR:', error);
        this.openFailureModal('Unable to create new neighborhood. Please try again later.');
      }
    )
  } else { // -- If FORM NOT VALID
    this.openFailureModal('One or more fields are invalid.');
  }
}


openSuccessModal() {
  this.dialog.open(SuccessModalComponent, {
    data: { message: "Neighborhood was created successfully." }
  });
}

openFailureModal(message) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}
}
