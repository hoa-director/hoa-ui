import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// -- services
import { NeighborhoodCenterService } from "../../../services/neighborhood-center.service";  
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
  constructor(
    // --  SERVICES
    private neighborhoodCenterService: NeighborhoodCenterService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) {}

ngOnInit(): void {
  this.addNeighborhoodForm = this.fb.group({
    name: ['', [Validators.required]], 
  });
}

onCancel(): void {
  this.onReset();
  this.router.navigate(['/home/neighborhood-center/view']);
}

// -- CLEAR FORM -- //
onReset(): void { 
  this.addNeighborhoodForm.reset();
  this.addNeighborhoodForm.markAsPristine();
  this.addNeighborhoodForm.markAsUntouched();
}


addNeighborhood(): void {
  if (this.addNeighborhoodForm.valid) {
    const formValues = this.addNeighborhoodForm.value;
    let neighborhood = {
      name: formValues.name,
    }

    this.neighborhoodCenterService
    .createNeighborhood(neighborhood)
    .subscribe(
      (responseData: any) => { // server will send status of 201 or 500
        if (responseData.status === 500) { // error
          this.openFailureModal('Unable to create new neighborhood. Please try again later.');
        } else { // success
          this.openSuccessModal();
          this.onReset(); // -- Reset Form
          this.router.navigate(['/home/neighborhood-center/view']);
        }
      }, (error) => { // -- If Error
        console.log('Add neighborhood error:', error);
        this.openFailureModal('Unable to save new neighborhood. Please try again later.');
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

openFailureModal(message: string) {
  this.dialog.open(FailureModalComponent, {
    data: { message: message }
  })
}
}
