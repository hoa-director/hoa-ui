import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class DataService {
  private rulesListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {}

  fetchUnits() {
    return this.http.get(BACKEND_URL + "/api/directory", {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
    });
  }

  fetchDocuments() {
    return this.http.get(BACKEND_URL + "/api/documents", {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
    });
  }

  fetchRules() {
    return this.http.get(BACKEND_URL + "/api/rules", {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
    });
  }

  fetchDocumentById(documentId: string) {
    return this.http.get(BACKEND_URL + `/api/documents/${documentId}`, {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
      responseType: "blob",
    });
  }
}
