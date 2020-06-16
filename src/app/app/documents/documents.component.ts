import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SpinnerService } from "app/services/spinner.service";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.css"],
})
export class DocumentsComponent implements OnInit {
  documents: Array<{ name: string; id: number }>;

  private documentsListenerSubs: Subscription;
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
    this.dataService.getDocuments();
  }
  ngOnDestroy() {
    this.documentsListenerSubs.unsubscribe();
    this.loadingListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.documentsListenerSubs = this.dataService
      .getDocumentsListener()
      .subscribe((response: any) => {
        this.documents = response;
      });

    this.loadingListenerSubs = this.spinnerService
      .getLoadingStatusListener()
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
      });
  }
}
