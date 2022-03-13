import { Component, OnInit, ViewChild } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { Objection } from "../models/objection";
import { MatTable } from "@angular/material/table";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"],
})
export class InboxComponent implements OnInit {
  @ViewChild("inboxTable") inboxTable: MatTable<any>;

  public objections: Objection[] = [];

  public currentObjection;

  public displayedColumns: string[] = [
    "submitted-by",
    "submitted-against",
    "submitted-on",
    "vote-button",
  ];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

  private init() {
    this.resolutionCenterService
      .getInbox()
      .subscribe((response) => {
        this.objections = response.objections;
      })
      .add(() => {
        this.inboxTable.renderRows();
      });
  }

  selectObjection(objection: Objection) {
    this.currentObjection = objection;
  }

  vote(approved) {
    this.resolutionCenterService
      .submitVote({
        approved,
        objectionId: this.currentObjection.id,
      })
      .subscribe((response) => {});
  }
}
