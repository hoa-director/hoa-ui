import { Component, OnInit, OnDestroy } from '@angular/core';
// import { UserService } from "../../../../services/user.service";
import { DataService } from "app/services/data.service";
import { Router } from '@angular/router';
// -- css & Components
// import { isLoading } from "../../../../shared/isLoading";
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuccessModalComponent } from "app/app/success-modal/success-modal.component";
import { FailureModalComponent } from "app/app/failure-modal/failure-modal.component";

@Component({
  selector: 'app-units-edit-own',
  templateUrl: './units-edit-own.component.html',
  styleUrls: ['./units-edit-own.component.css'],
  // imports: [MatFormFieldModule, ReactiveFormsModule],
  // standalone: true,
})
export class UnitsEditOwnComponent {
  phoneOneLabel: string = '';
  phoneOneNumber: string = '';
  phoneTwoLabel: string = '';
  phoneTwoNumber: string = '';
  currentUserId: number = parseInt(sessionStorage.getItem('userId'));
  editUnitOwnForm: FormGroup;

constructor(
  private dataService: DataService,
  private fb: FormBuilder,
  private dialog: MatDialog,
  private router: Router
) {}

// -- PAGE LOAD
ngOnInit() {
  // this.listenForEvents();
  this.initEditUnitOwnForm();
  this.getPhoneFields();
}


// -- INIT EDIT FORM
initEditUnitOwnForm() {
  this.editUnitOwnForm = this.fb.group({
    phoneOneLabel: [''],
    phoneOneNumber: [''],
    phoneTwoLabel: [''],
    phoneTwoNumber: [''],
  });
}

getPhoneFields() {
  this.dataService.getPhoneFields(this.currentUserId).subscribe(
    (response: any) => {
      this.updateEditUnitOwnForm(response);
    }
  );
}

// Update form values after fetching phone fields
updateEditUnitOwnForm(phoneFields: any) {
  this.editUnitOwnForm.patchValue({
    phoneOneLabel: phoneFields.phoneOneLabel || '',
    phoneOneNumber: phoneFields.phoneOneNumber || '',
    phoneTwoLabel: phoneFields.phoneTwoLabel || '',
    phoneTwoNumber: phoneFields.phoneTwoNumber || ''
  });
}


// -- SUBMIT PHONE FIELD CHANGES
savePhone() {
  const formValues = this.editUnitOwnForm.value
  const phoneObj = {
    phoneOneLabel: formValues.phoneOneLabel,
    phoneOneNumber: formValues.phoneOneNumber,
    phoneTwoLabel: formValues.phoneTwoLabel,
    phoneTwoNumber: formValues.phoneTwoNumber,
  }
  this.dataService
    .updatePhoneFields(phoneObj, this.currentUserId)
    .subscribe(
      (responseData: any) => {
        if (responseData.status === 'success') {
          this.openSuccessModal();
          this.router.navigate(['/home/directory/units-view']);
        } else {
          this.openFailureModal(); // Handle failure
        }
      }
    );
}


// -- CANCEL
onCancel() {
  // this.editUnitForm.reset({
  //   associationId: this.associations[0].id, // required
  //   addressLineOne: '',
  //   // addressLineTwo: '',
  //   // city: '',
  //   // state: '',
  //   // zip: '',
  //   user: '', // required
  // });
  this.router.navigate(['/home/directory/units-view']);
}

openSuccessModal() {
  this.dialog.open(SuccessModalComponent, {
    data: { message: "Phone number(s) have been updated successfully" }
  });
}

openFailureModal() {
  this.dialog.open(FailureModalComponent, {
    data: { message: "Unable to update phone number(s)" }
  })
}

}
