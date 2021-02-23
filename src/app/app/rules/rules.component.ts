import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { SpinnerService } from "app/services/spinner.service";
import { Subscription } from "rxjs";
import { Rule } from "./rule.model";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"],
})
export class RulesComponent implements OnInit {
  rules: Rule[] = [];
  currentRuleList: any;

  private loadingListenerSubs: Subscription;
  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ListenForEvents();
  }

  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  ListenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation.subscribe(
      () => {
        this.onFetchRules();
      }
    );
  }

  onFetchRules() {
    this.spinnerService.setLoadingStatusListener(true);

    this.dataService.fetchRules().subscribe((responseData: any) => {
      this.rules = [...responseData];
    }).add(() => {
      this.spinnerService.setLoadingStatusListener(false);
    });
  }

  selectRuleList(ruleList) {
    this.currentRuleList = ruleList;
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
