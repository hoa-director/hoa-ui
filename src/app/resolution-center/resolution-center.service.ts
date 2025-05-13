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


  public getInbox(): Observable<{ objections: Objection[] }> {
    const endPoint = "/api/inbox"
    return this.http.get<{ objections: Objection[] }>(BACKEND_URL + endPoint )  //, {
    //   params: new HttpParams()
    //     .set( "associationId", sessionStorage.getItem("associationId").toString())
    //     // .set("userId", 4), //sessionStorage.getItem("userId").toString()),
    // }
  // );
  }


  public getInboxTEST() { 
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
    const endpoint = "/api/units"
    return this.http.get<{ units: any[] }>(
      BACKEND_URL + endpoint,
      {
        params: new HttpParams().set( "associationId", sessionStorage.getItem("associationId").toString() )
      }
    );
  }

  // -- POST Route 
  public submitObjection(objection: any) {
    const endpoint = "/api/objections"
    // console.log('objection:', objection); // organizationId, against, comment
    return this.http.post( 
      BACKEND_URL + endpoint, 
      { objection }
    );
  }

  public submitVote(vote: number, objectionId: number) {
    const endpoint = "/api/vote"
    return this.http.post(
      BACKEND_URL + endpoint,
      { vote: { vote, objectionId } },
      { params: new HttpParams().set(
          "userId",
          sessionStorage.getItem("userId").toString()),
      }
    );
  }

  public submitBreakTie(vote: number, objectionId: number) {
    const endpoint = "/api/break-tie"
    return this.http.put(
      BACKEND_URL + endpoint,
      { vote: { vote, objectionId } }
    );
  }

  // function is unused
  public getOutbox(): Observable<{ objections: any[] }> {
    const endpoint = "/api/outbox"
    console.log('getOutbox() runs');
    return this.http.get<{ objections: any[] }>( BACKEND_URL + endpoint, {
      params: new HttpParams()
        .set("associationId", sessionStorage.getItem("associationId"))
        .set("userId", sessionStorage.getItem("userId"))
    });
  }


  // -- GET Route
  public getObjection(id) {
    const endpoint = "/api/objections/"
    return this.http.get(BACKEND_URL + endpoint + id);
  }

  public getPastObjections(): Observable<{ objections: any[] }> {
    const endpoint = "/api/objections/past"

    return this.http.get<{ objections: any[] }>(BACKEND_URL + endpoint);
    // params: new HttpParams().set( "associationId", sessionStorage.getItem("associationId").toString() ),
  }

  public getVoteCountPres(objectionId: number): any {
    const endpoint = "/api/getVoteCountPresident";
    return this.http.get(BACKEND_URL + endpoint, {
      params: new HttpParams().set("objectionId", objectionId.toString()),
    });
  }

  private getUserIdParams(): void {
    sessionStorage.getItem("userId").toString();
  }

  private getAssociationIdParams(): void {
    sessionStorage.getItem("associationId").toString();
  }
}
