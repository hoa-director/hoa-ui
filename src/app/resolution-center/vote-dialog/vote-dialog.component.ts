import { Component, OnInit, Inject } from "@angular/core";
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { Objection } from "../models/objection";
import { ResolutionCenterService } from "../resolution-center.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-vote-dialog",
  templateUrl: "./vote-dialog.component.html",
  styleUrls: ["./vote-dialog.component.scss"],
})
export class VoteDialogComponent implements OnInit {
  objectionData: Objection;



  voteForm = new UntypedFormGroup ({
    voteControl: new UntypedFormControl(null, Validators.required)
  });

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    public voteDialogRef: MatDialogRef<VoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public objVoteData: any
  ) {}

  ngOnInit() {
    this.objectionData = this.objVoteData;
    console.log('objectionData:', this.objectionData);
    this.voteForm.statusChanges.subscribe(() => {
      console.log(this.voteForm.get("voteControl").value);
    })
    this.voteDialogRef.afterClosed().subscribe(() => {
      this.voteForm.reset();
    })
  }

  onSubmit(objectionId: number) {
    console.log('OnSubmit!');
    console.log('objectionId:', objectionId);
    var vote = this.voteForm.get("voteControl").value;
    this.resolutionCenterService
      .submitVote(
        vote,
        objectionId,
      )
      .subscribe((response) => {});
  }
}
