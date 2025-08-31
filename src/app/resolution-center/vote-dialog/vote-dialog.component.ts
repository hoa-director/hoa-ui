import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Objection } from "../models/objection";
import { ResolutionCenterService } from "../resolution-center.service";
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-vote-dialog",
  templateUrl: "./vote-dialog.component.html",
  styleUrls: ["./vote-dialog.component.scss"],
})

export class VoteDialogComponent implements OnInit {
  objectionData: Objection;
  selectedVote: number;
  voteForm: UntypedFormGroup;

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    public voteDialogRef: MatDialogRef<VoteDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public objVoteData: any
  ) {
    this.voteForm = this.fb.group({
      voteControl: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.objectionData = this.objVoteData;
    this.voteForm.statusChanges.subscribe(() => {
      // console.log(this.voteForm.get("voteControl").value);
      this.selectedVote = Number(this.voteForm.get("voteControl").value);
    })
    this.voteDialogRef.afterClosed().subscribe(() => {
      this.voteForm.reset();
    })
  }

  onSubmit(objectionId: number) {
    this.resolutionCenterService
      .submitVote(
        this.selectedVote,
        objectionId,
      )
      .subscribe((response) => {});
  }
}
