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
  isLoading = false;
  formIsDisabled: boolean = false

  constructor(
    private neighborhoodCenterService: NeighborhoodCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // -- PAGE LOAD
  ngOnInit() {
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
      name: ['', [Validators.required]], 
    });
  }

  disableForm(){
    this.editNeighborhoodForm.get('name')?.disable();
    this.formIsDisabled= true;
  }
  enableForm(){
    this.editNeighborhoodForm.get('name')?.enable();
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
    });
  }


  // -- UPDATE EDIT FORM
  updateEditNeighborhoodForm(neighborhood: any) {
    this.editNeighborhoodForm.patchValue({
      name: neighborhood.name || '',
    });
  }


  // -- SAVE NEIGHBORHOOD CHANGES
  saveNeighborhoodChanges(){
    if(this.editNeighborhoodForm.valid){
      const formValues = this.editNeighborhoodForm.value;
      const neighborhoodObj = {
        name: formValues.name,
      }

      this.neighborhoodCenterService
      .updateNeighborhood(this.associationId, neighborhoodObj)
      .subscribe(
        (responseData: any) => {
          if (responseData.status === 'success') {
            this.openSuccessModal("Neighborhood was successfully updated.");
            this.router.navigate(["/home/neighborhood-center/view"]);
          } else if (responseData.status === 'failure') {
            this.openFailureModal("Unable to update neighborhood. Please try again later.");
          }
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(["/home/neighborhood-center/view"]);
  }

  onDelete() {
    const confirmed = window.confirm("Are you sure you want to permanently delete this neighborhood?");
    if (confirmed) {
      this.neighborhoodCenterService.deleteNeighborhood(this.associationId).subscribe((response: any) => {
        if (response.status === 'success') {
          this.openSuccessModal("Successfully deleted neighborhood.");
          this.router.navigate(["/home/neighborhood-center/view"]);
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
