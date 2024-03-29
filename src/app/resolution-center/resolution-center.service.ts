import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Objection } from "./models/objection";

@Injectable({
  providedIn: "root",
})
export class ResolutionCenterService {
  constructor(private http: HttpClient) {}

  public getInbox(): Observable<{ objections: Objection[] }> {
    return this.http.get<{ objections: Objection[] }>("/api/inbox", {
      params: new HttpParams()
        .set(
          "associationId",
          sessionStorage.getItem("associationId").toString()
        )
        .set("userId", sessionStorage.getItem("userId").toString()),
    });
  }

  public getUnits(): Observable<{ units: any[] }> {
    return this.http.get<{ units: any[] }>("/api/units", {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
    });
  }
  public submitObjection(objection) {
    return this.http.post(
      "/api/objections",
      { objection },
      {
        params: new HttpParams()
          .set(
            "associationId",
            sessionStorage.getItem("associationId").toString()
          )
          .set("userId", sessionStorage.getItem("userId").toString()),
      }
    );
  }

  public submitVote(vote: number, objectionId: number) {
    return this.http.post(
      "/api/vote",
      { vote: { vote, objectionId } },
      {
        params: new HttpParams().set(
          "userId",
          sessionStorage.getItem("userId").toString()
        ),
      }
    );
  }

  public getOutbox(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>("/api/outbox", {
      params: new HttpParams()
        .set(
          "associationId",
          sessionStorage.getItem("associationId").toString()
        )
        .set("userId", sessionStorage.getItem("userId").toString()),
    });
  }

  public getObjection(id) {
    return this.http.get("/api/objections/" + id);
  }

  public getPastObjections(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>("/api/objections/past", {
      params: new HttpParams().set(
        "associationId",
        sessionStorage.getItem("associationId").toString()
      ),
    });
  }

  private getUserIdParams(): void {
    sessionStorage.getItem("userId").toString();
  }

  private getAssociationIdParams(): void {
    sessionStorage.getItem("associationId").toString();
  }
}
