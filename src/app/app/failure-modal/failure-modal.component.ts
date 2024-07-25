import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatIcon } from '@Angular/material'

@Component({
  selector: 'app-failure-modal',
  templateUrl: './failure-modal.component.html',
  styleUrls: ['./failure-modal.component.css']
})
export class FailureModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FailureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string } 
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
