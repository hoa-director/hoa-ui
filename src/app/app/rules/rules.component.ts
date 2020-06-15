import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"],
})
export class RulesComponent implements OnInit {
  rules: any = [];
  currentRuleList: any;
  rulesStringify: string;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  selectRuleList(ruleList) {
    this.currentRuleList = ruleList;
  }

  init() {
    this.dataService.getRules().subscribe((response) => {
      this.rules = response;
      this.rulesStringify = JSON.stringify(response, null, 2);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        ruleTitle: this.currentRuleList.title,
        ruleDescription: this.currentRuleList.description,
        rules: this.currentRuleList.rules,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
