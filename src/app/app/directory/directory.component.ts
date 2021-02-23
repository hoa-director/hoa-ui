import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SpinnerService } from "app/services/spinner.service";
import { Unit } from "./unit.model";

@Component({
  selector: "app-directory",
  templateUrl: "./directory.component.html",
  styleUrls: ["./directory.component.css"],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  units: Unit[] = [];

  private userSubjectSubs: Subscription;
  private loadingListenerSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.listenForEvents();
    this.onFetchUnits();
  }

  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  onFetchUnits() {
    this.spinnerService.setLoadingStatusListener(true);

    this.dataService.fetchUnits().subscribe((responseData: any) => {
      this.units = [...responseData.units];
    }).add(() => {
      this.spinnerService.setLoadingStatusListener(false);
    });
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation.subscribe(
      () => {
        this.onFetchUnits();
      }
    );
  }
}
