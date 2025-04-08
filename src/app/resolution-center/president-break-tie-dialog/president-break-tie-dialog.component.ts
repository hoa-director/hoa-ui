import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { Objection } from "../models/objection";
import { ResolutionCenterService } from "../resolution-center.service";
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-president-break-tie-dialog",
  templateUrl: "./president-break-tie-dialog.component.html",
  styleUrls: ["./president-break-tie-dialog.component.scss"],
  imports: [MatDialogModule, MatRadioModule, ReactiveFormsModule],
  standalone: true,
})

export class PresidentBreakTieDialogComponent implements OnInit {
  objectionData: Objection;
  selectedVote: number;
  breakTieForm: UntypedFormGroup;

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    public presidentBreakTieDialogRef: MatDialogRef<PresidentBreakTieDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public objVoteData: any
  ) {
    this.breakTieForm = this.fb.group({
      breakTieControl: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.objectionData = this.objVoteData;
    this.breakTieForm.statusChanges.subscribe(() => {
      console.log(this.breakTieForm.get("breakTieControl").value);
      this.selectedVote = Number(this.breakTieForm.get("breakTieControl").value);
    })
    this.presidentBreakTieDialogRef.afterClosed().subscribe(() => {
      this.breakTieForm.reset();
    })
  }

  onSubmit(objectionId: number) {
    console.log('objectionId:', objectionId);
    // this.resolutionCenterService
    //   .submitVote(
    //     this.selectedVote,
    //     objectionId,
    //   )
    // .subscribe((response) => {});
  }
}
