import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SpinnerService } from "./spinner.service";
import { environment } from "../../environments/environment";
import { asObservable } from "./asObservable";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class DataService {
  public directoryListener = new BehaviorSubject<any>("");
  public documentsListener = new BehaviorSubject<any>("");
  public rulesListener = new BehaviorSubject<any>("");
  public documentListener = new BehaviorSubject<any>("");

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  getDirectoryListener() {
    return this.directoryListener.asObservable();
  }

  getDocumentsListener() {
    return this.documentsListener.asObservable();
  }

  getDocumentListener() {
    return this.documentListener.asObservable();
  }

  getRulesListener() {
    return this.rulesListener.asObservable();
  }

  getDirectory() {
    this.spinnerService.setLoadingStatusListener(true);
    this.http
      .get(BACKEND_URL + "/api/directory")
      .subscribe((response) => {
        this.directoryListener.next(response);
      })
      .add(() => {
        this.spinnerService.setLoadingStatusListener(false);
      });
  }

  getDocuments() {
    this.spinnerService.setLoadingStatusListener(true);
    this.http
      .get(BACKEND_URL + "/api/documents")
      .subscribe((response) => {
        this.documentsListener.next(response);
      })
      .add(() => {
        this.spinnerService.setLoadingStatusListener(false);
      });
  }

  getRules() {
    this.spinnerService.setLoadingStatusListener(true);
    this.http
      .get(BACKEND_URL + "/api/rules")
      .subscribe((response) => {
        this.rulesListener.next(response);
      })
      .add(() => {
        this.spinnerService.setLoadingStatusListener(false);
      });
  }

  getDocumentById(documentId: string) {
    this.spinnerService.setLoadingStatusListener(true);
    this.http
      .get(BACKEND_URL + `/api/documents/${documentId}`, { responseType: 'blob' })
      .subscribe((response) => {
        this.documentListener.next(response);
      })
      .add(() => {
        this.spinnerService.setLoadingStatusListener(false);
      });
  }
}
