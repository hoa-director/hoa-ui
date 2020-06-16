import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SpinnerService } from "app/services/spinner.service";

@Component({
  selector: "app-directory",
  templateUrl: "./directory.component.html",
  styleUrls: ["./directory.component.css"],
})
export class DirectoryComponent implements OnInit {
  units: Array<{
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    user: {
      email: string;
      phone: string;
      fullName: string;
      firstName: string;
      lastName: string;
    };
  }> = [];

  private directoryListenerSubs: Subscription;
  private loadingListenerSubs: Subscription;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.listenForEvents();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.listenForEvents();
    });
    this.dataService.getDirectory();
  }

  ngOnDestroy() {
    this.directoryListenerSubs.unsubscribe();
    this.loadingListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.directoryListenerSubs = this.dataService
      .getDirectoryListener()
      .subscribe((response: any) => {
        this.units = response.units;
      });

    this.loadingListenerSubs = this.spinnerService
      .getLoadingStatusListener()
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
      });
  }
}
