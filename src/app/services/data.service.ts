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

  fetchDocumentById(documentId: string) {
    return this.http.get(BACKEND_URL + `/api/documents/${documentId}`, {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
      responseType: "blob",
    });
  }
  
  // -- this does fire 
    fetchRules() { 
      console.log(`fetchRules() EndPoint: ${BACKEND_URL}`+"/api/rules");
      return this.http.get(BACKEND_URL + "/api/rules", {
        params: new HttpParams().set(
          "associationId",
          sessionStorage.getItem("associationId").toString()
        ),
      });
    }

// -- this does fire 
  createTestRow(thing1: string, thing2: boolean, thing3: number) {
    console.log(`createTestRow() EndPoint: ${BACKEND_URL}`+"/api/createRow2");
    const payload = {
      column1string: thing1, 
      column2boolean: thing2, 
      column3int: thing3}
    return this.http.post(BACKEND_URL + "/api/createRow2", payload
    // {   // -- make sure front end is matches POST/GET/ETC
    //   // params: new HttpParams().set(
    //   //   "column3int", 123
    //   //   // -- somehow this is sending the URL "column3int=123" as a query string
    //   // ),
    // }
  );
  }



}
