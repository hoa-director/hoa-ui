import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Objection } from "./models/objection";

// -- ADDED 2/10/25 - NEED FOR DEPLOYING. CONFIGURES NETLIFY TO HEROKU CONNECTIONS
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class ResolutionCenterService {
  constructor(private http: HttpClient
    
  ) {}

  public getInboxOLD(): Observable<{ objections: Objection[] }> {
    return this.http.get<{ objections: Objection[] }>("/api/inbox")  //, {
    //   params: new HttpParams()
    //     .set( "associationId", sessionStorage.getItem("associationId").toString())
    //     // .set("userId", 4), //sessionStorage.getItem("userId").toString()),
    // }
  // );
  }


  public getInbox() { 
    const endPoint = "/api/inbox"
      // const organizationId = sessionStorage.getItem("associationId").toString()
      // const payload = {
      //   organizationId: 1, // -- associationIds MUST be un an array to work.
      // }
      // console.log('PAYLOAD:', payload);
    return this.http.get(BACKEND_URL + endPoint ).pipe(
      catchError((error) => {
        console.error('/api/inbox API failed.', error);
        return throwError(error);
      })
    );
    
  }




  public getUnits(): Observable<{ units: any[] }> { // -- Get list of units to file motion against
    return this.http.get<{ units: any[] }>("/api/units" );
    // params: new HttpParams().set( "associationId", sessionStorage.getItem("associationId").toString()),
  }

  // -- POST Route 
  public submitObjection(objection) {
    console.log('OBJECTION:', objection);
    return this.http.post( "/api/objections", { objection },);
      // { params: new HttpParams() .set( "associationId", sessionStorage.getItem("associationId").toString()) .set( "userId", 1 ),} 
  }

  public submitVote(vote: number, objectionId: number) {
    return this.http.post(
      "/api/vote",
      { vote: { vote, objectionId } },
      { params: new HttpParams().set(
          "userId",
          sessionStorage.getItem("userId").toString()),
      }
    );
  }

  public getOutbox(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>("/api/outbox", {
      params: new HttpParams() .set( "associationId", sessionStorage.getItem("associationId").toString())
      .set("userId", 4), //sessionStorage.getItem("userId").toString()),
    });
  }


  // -- GET Route
  public getObjection(id) {
    return this.http.get("/api/objections/" + id);
  }

  public getPastObjections(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>("/api/objections/past");
    // params: new HttpParams().set( "associationId", sessionStorage.getItem("associationId").toString() ),
  }

  private getUserIdParams(): void {
    sessionStorage.getItem("userId").toString();
  }

  private getAssociationIdParams(): void {
    sessionStorage.getItem("associationId").toString();
  }
}
