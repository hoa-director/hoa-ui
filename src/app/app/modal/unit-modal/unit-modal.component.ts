import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'app/models/user.model';


@Component({
  selector: 'app-add-unit',
  templateUrl: './unit-modal.component.html',
  styleUrls: ['./unit-modal.component.css']
})
export class UnitModalComponent implements OnInit {
  userModel: UserModel;
  
  newUnitForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.newUnitForm = this.formBuilder.group({
      input1: ['', Validators.required] // - Empty string as initial state
    })
    // this.userModel.firstName = 'hoadirector.dev1@gmail.com';
  }
  // -- CLOSE Dialogue
  onCloseClick(): void {
    // this.dialogRef.close('result'); // Close the dialog and pass 'result' as result
    console.log('close button');
  }
  // -- SUBMIT Dialogue
  onSubmit(): void {
    console.log('submit new unit');
  }


}
