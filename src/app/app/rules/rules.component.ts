import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { Subscription } from "rxjs";
import { Rule } from "./rule.model";
import { isLoading } from "../../shared/isLoading";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"],
})
export class RulesComponent implements OnInit {
  rules: Rule[] = [];
  currentRuleList: any;

  private userSubjectSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ListenForEvents();
    this.onFetchRules();
  }

  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  ListenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
      () => {
        this.onFetchRules();
      }
    );
  }

  onFetchRules() {
    isLoading(true);
    this.dataService.fetchRules().subscribe((responseData: any) => { // -- Subscribe to fetchRules HERE
      this.rules = [...responseData];
    }).add(() => {
      isLoading(false);
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
  }
}
