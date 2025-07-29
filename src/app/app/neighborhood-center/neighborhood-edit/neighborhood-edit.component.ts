import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
// -- services
import { NeighborhoodCenterService } from 'app/services/neighborhood-center.service';
// -- models

// -- interfaces
// import { User } from "../../../../interfaces/user";
// -- css & Components
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SuccessModalComponent } from "app/app/success-modal/success-modal.component";
import { FailureModalComponent } from "app/app/failure-modal/failure-modal.component";
import { error } from 'console';

@Component({
  selector: 'app-neighborhood-edit',
  templateUrl: './neighborhood-edit.component.html',
  styleUrls: ['./neighborhood-edit.component.css']
})

export class NeighborhoodEditComponent {
  associationId: number;
  neighborhood: any;
  editNeighborhoodForm: FormGroup;
  // allNeighborhood: any;
  allRoles: any[] = [];
  isLoading = false;
  formIsDisabled: boolean = false
  associations: any = [];
  addresses: any[] = [];


  constructor(
    private neighborhoodCenterService: NeighborhoodCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // -- PAGE LOAD
  ngOnInit() {
    // this.listenForEvents();

    this.getParams();
    this.initEditNeighborhoodForm();
  } 


  // -- GET PARAMS (IF THEY EXIST)
  getParams(){
    this.route.paramMap.subscribe(params => {
      this.associationId = +params.get('associationId');
      if (this.associationId) {
        this.getNeighborhood(this.associationId)
      }
    });
  }

  initEditNeighborhoodForm() {
    this.editNeighborhoodForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      organization: ['', [Validators.required]], 
      role: ['', [Validators.required] ], 
      address: [''],
    });
  }

  disableForm(){
    this.editNeighborhoodForm.get('email')?.disable();
    this.editNeighborhoodForm.get('firstName')?.disable();
    this.editNeighborhoodForm.get('lastName')?.disable();
    this.editNeighborhoodForm.get('organization')?.disable();
    this.editNeighborhoodForm.get('role')?.disable();
    this.editNeighborhoodForm.get('address')?.disable();
    this.formIsDisabled= true;
  }
  enableForm(){
    console.log('YES');  
    this.editNeighborhoodForm.get('email')?.enable();
    this.editNeighborhoodForm.get('firstName')?.enable();
    this.editNeighborhoodForm.get('lastName')?.enable();
    this.editNeighborhoodForm.get('organization')?.enable();
    this.editNeighborhoodForm.get('role')?.enable();
    this.editNeighborhoodForm.get('address')?.enable();
    this.formIsDisabled = false;
  }

  // -- GET NEIGHBORHOOD
  getNeighborhood(associationId: number) {
    this.neighborhoodCenterService.fetchOneNeighborhood(associationId)
    .subscribe((responseData: any) => {
      this.neighborhood = responseData;
      if (this.neighborhood){
        this.updateEditNeighborhoodForm(this.neighborhood)
      }
    }).add(() => {
    });
  }


  // -- UPDATE EDIT FORM
  updateEditNeighborhoodForm(neighborhood: any) {
    this.editNeighborhoodForm.patchValue({
      email: neighborhood.email || '',
      firstName: neighborhood.firstName || '',
      lastName: neighborhood.lastName || '',
      organization: neighborhood.organization || '',
      role: neighborhood.role || '',
      address: neighborhood.units[0]?.id || '',
    });
  }


  // -- SAVE NEIGHBORHOOD CHANGES
  saveNeighborhoodChanges(){
    if(this.editNeighborhoodForm.valid){
      const formValues = this.editNeighborhoodForm.value
      const neighborhoodObj = {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        number: formValues.organization,
        role: formValues.role,
        // status: formValues.status === 'true' ? true : (formValues.status === 'false' ? false : null), //  true/false
      } 

      const unitId = formValues.address ? formValues.address : null;

      // console.log('formValues.status:', formValues.status);

      this.neighborhoodCenterService
      .updateNeighborhood(this.associationId, neighborhoodObj)
      .subscribe(
        (responseData: any) => {
          // console.log('response subscribe');
          if (responseData.status === 'success') {
            // console.log('RESPONSE:', responseData);
            this.openSuccessModal("Neighborhood was successfully updated.");
            this.router.navigate(["/home/neighborhood-center/neighborhood-view"]);
          } else if (responseData.status === 'failure') {
            // console.log('RESPONSE', responseData);
            this.openFailureModal("Unable to update neighborhood. Please try again later.");
          }
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(["/home/neighborhood-center/neighborhood-view"]);
  }

  onDelete() {
    const confirmed = window.confirm("Are you sure you want to permanently delete this neighborhood?");
    if (confirmed) {
      this.neighborhoodCenterService.deleteNeighborhood(this.associationId).subscribe((response: any) => {
        if (response.ok) {
          this.openSuccessModal("Successfully deleted neighborhood.");
          this.router.navigate(["/home/neighborhood-center/neighborhood-view"]);
        } else {
          this.openFailureModal("Failed to delete neighborhood. Please try again later.");
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
