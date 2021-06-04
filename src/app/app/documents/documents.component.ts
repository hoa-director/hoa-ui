import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { Document } from "./document.model";
import { isLoading } from "../../shared/isLoading";

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
  ) {}

  ngOnInit() {
    this.listenForEvents();
    this.onFetchDocuments();
  }
  ngOnDestroy() {
    this.userSubjectSubs.unsubscribe();
  }

  onFetchDocuments() {
    isLoading(true);
    this.dataService
      .fetchDocuments()
      .subscribe((responseData: any) => {
        this.documents = [...responseData];})
        .add(()=>{
          isLoading(false);
        });
  }

  onFetchAndOpenDocument(documentId: string) {
    isLoading(true);
    this.dataService
      .fetchDocumentById(documentId)
      .subscribe((response: Blob) => {
        var file = new Blob([response], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        this.fileSource = fileURL;
        this.openDocumentInWindow(this.fileSource);})
        .add(()=> {
          isLoading(false);
        });
  }

  listenForEvents() {
    this.userSubjectSubs = this.userService.selectedAssociation$.subscribe(
      () => {
        this.onFetchDocuments();
      }
    );
  }

  openDocumentInWindow(fileSource: string) {
    window.open(fileSource);
  }
}
