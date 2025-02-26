import { Component, OnInit, ViewChild } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { Objection } from "../models/objection";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { VoteDialogComponent } from "../vote-dialog/vote-dialog.component";

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
    public voteDialog: MatDialog
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
    console.log('obj:', objection);
    const voteDialogRef = this.voteDialog.open(VoteDialogComponent, {
      data: objection,
    });
    voteDialogRef.afterClosed().subscribe(() => {
      this.init();
    });
  }
}
