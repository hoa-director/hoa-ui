import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Objection } from "../models/objection";
import { ResolutionCenterService } from "../resolution-center.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-vote-dialog",
  templateUrl: "./vote-dialog.component.html",
  styleUrls: ["./vote-dialog.component.scss"],
})
export class VoteDialogComponent implements OnInit {
  objectionData: Objection;



  voteForm = new FormGroup ({
    voteControl: new FormControl(null, Validators.required)
  });

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    public voteDialogRef: MatDialogRef<VoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public objVoteData: any
  ) {}

  ngOnInit() {
    this.objectionData = this.objVoteData;
    this.voteForm.statusChanges.subscribe(() => {
      console.log(this.voteForm.get("voteControl").value);
    })
    this.voteDialogRef.afterClosed().subscribe(() => {
      this.voteForm.reset();
    })
  }

  onSubmit(objectionId: number) {
    var vote = this.voteForm.get("voteControl").value;
    this.resolutionCenterService
      .submitVote(
        vote,
        objectionId,
      )
      .subscribe((response) => {});
  }
}
