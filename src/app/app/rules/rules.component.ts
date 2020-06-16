import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { SpinnerService } from "app/services/spinner.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"],
})
export class RulesComponent implements OnInit {
  rules: any = [];
  currentRuleList: any;

  private rulesListenerSubs: Subscription;
  private loadingListenerSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ListenForEvents();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.ListenForEvents();
    });
    this.dataService.getRules();
  }

  ngOnDestroy() {
    this.rulesListenerSubs.unsubscribe();
    this.loadingListenerSubs.unsubscribe();
  }

  ListenForEvents() {
    this.rulesListenerSubs = this.dataService
      .getRulesListener()
      .subscribe((response) => {
        this.rules = response;
      });

    this.loadingListenerSubs = this.spinnerService
      .getLoadingStatusListener()
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
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
