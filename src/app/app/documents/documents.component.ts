import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { SpinnerService } from "app/services/spinner.service";
import { Document } from "./document.model";
import { response } from "express";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.css"],
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];

  private loadingListenerSubs: Subscription;
  private userSubjectSubs: Subscription;
  isLoading = false;
  fileSource = "";

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.listenForEvents();
    this.onFetchDocuments();
  }
  ngOnDestroy() {
    this.loadingListenerSubs.unsubscribe();
    this.userSubjectSubs.unsubscribe();
  }

  onFetchDocuments() {
    this.spinnerService.setLoadingStatusListener(true);

    this.dataService.fetchDocuments().subscribe((responseData: any) => {
      console.log(responseData);
      this.documents = [...responseData];
    });
    this.spinnerService.setLoadingStatusListener(false);
  }

  onFetchAndOpenDocument(documentId: string) {
    this.spinnerService.setLoadingStatusListener(true);

    this.dataService
      .fetchDocumentById(documentId)
      .subscribe((response: Blob) => {
        var file = new Blob([response], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        this.fileSource = fileURL;
        this.openDocumentInWindow(this.fileSource);
      });

    this.spinnerService.setLoadingStatusListener(false);
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation.subscribe(
      () => {
        this.onFetchDocuments();
      }
    );

    this.loadingListenerSubs = this.spinnerService
      .getLoadingStatusListener()
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
      });
  }

  openDocumentInWindow(fileSource: string) {
    window.open(fileSource);
  }
}
