import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodCenterService {

  constructor(
    private http: HttpClient,
  ) { }


  // ---------------- VIEW NEIGHBORHOODS PAGE ---------------- //

  // -- GET NEIGHBORHOODS/ASSOCIATIONS
  fetchNeighborhoods() { 
    // const endPoint = "/api/getRoles"
    //   const organizationId = sessionStorage.getItem("associationId").toString()
    //   const payload = {
    //     organizationId: organizationId, // -- associationIds MUST be un an array to work.
    //   }
    //   console.log('PAYLOAD:', payload);
    // return this.http.post(BACKEND_URL + endPoint, payload );
  }


  // ---------------- ADD NEIGHBORHOOD PAGE ---------------- //

  createNeighborhood(neighborhoodObj: object) {
    // const payload = neighborhoodObj;
    // return this.http.post(BACKEND_URL + "/api/createUser", payload);
  }


  // ---------------- EDIT NEIGHBORHOOD PAGE ---------------- //

  // -- GET SELECTED NEIGHBORHOOD/ASSOCIATION
  fetchOneNeighborhood(associationId: number) { 
    // const endPoint = "/api/getUser"
    // const payload = { userId };
    // return this.http.post(BACKEND_URL + endPoint, payload );
  }

  // -- UPDATE NEIGHBORHOOD/ASSOCIATION
  updateNeighborhood(associationId: number, neighborhoodObj: object){
    // const endPoint = "/api/updateUserStatus"
    // const payload = { associationId, neighborhoodObj };
    // return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
    //   catchError((error) => {
    //     console.error('Update User Status API failed.', error);
    //     return throwError(error);
    //   })
    // );
  }

  deleteUser(userId: number) {
    const endpoint = "/api/deleteUser/";
    return this.http.delete(BACKEND_URL + endpoint + userId).pipe(
      catchError(error => {
        console.error('Delete user failed:', error);
        return throwError(error);
      })
    );
  }
}



