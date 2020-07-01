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
  private documentListenerSubs: Subscription;
  private loadingListenerSubs: Subscription;
  isLoading = false;
  fileSource = "";

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
    this.documentListenerSubs.unsubscribe();
    this.loadingListenerSubs.unsubscribe();
  }

  listenForEvents() {
    this.documentsListenerSubs = this.dataService
      .getDocumentsListener()
      .subscribe((response: any) => {
        this.documents = response;
      });

    this.documentListenerSubs = this.dataService
      .getDocumentListener()
      .subscribe((response: Blob) => {
        var file = new Blob([response], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        // window.open(fileURL);
        this.fileSource = fileURL;
      });

    this.loadingListenerSubs = this.spinnerService
      .getLoadingStatusListener()
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
      });
  }

  getDocument(event: Event) {
    this.dataService
      .getDocumentById((<HTMLAnchorElement>event.target).id);
  }
}
