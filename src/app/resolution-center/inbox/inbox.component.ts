import { Component, OnInit, ViewChild } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { Objection } from "../models/objection";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { VoteDialogComponent } from "../vote-dialog/vote-dialog.component";
import { ObjectionDetailsComponent } from "../objection-details/objection-details.component";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"],
})
export class InboxComponent implements OnInit {
  @ViewChild("inboxTable") inboxTable: MatTable<any>;

  public objections: Objection[] = [];

  public currentObjection: any;

  public displayedColumns: string[] = [
    "submitted-by",
    "submitted-against",
    "submitted-on",
    "vote-button",
  ];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    private userService: UserService,
    public voteDialog: MatDialog,
    public detailDialog: MatDialog
  ) {}

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

    // --  Get list of Open objections - works
  private init() {
    this.resolutionCenterService
      .getInbox().subscribe((response) => {
        // console.log('response:', response);
        // console.log('response.objections:', response.objections);

        this.objections = response.objections;
      });
  }

  selectObjection(objection: Objection) {
    this.currentObjection = objection;
  }

  openDialog(objection: Objection) {
    // console.log('obj:', objection);
    const voteDialogRef = this.voteDialog.open(VoteDialogComponent, {
      width: '500px',
      data: objection,
    });
    voteDialogRef.afterClosed().subscribe(() => {
      this.init();
    });
  }

  openDetails(objection: any): void {
    // console.log('objection:', objection);
    if (objection.votes[0]?.objection_id > 0) {
      const detailDialogRef = this.detailDialog.open(ObjectionDetailsComponent, {
        width: '500px',
        data: { 
          objection: objection,
          source: 'inbox'
        },
      });
      detailDialogRef.afterClosed().subscribe(() => {
        this.init();
      });
    } else {
      return;
    }
  }
}
