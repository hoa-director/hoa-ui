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

  fetchNeighborhoods() { 
    const endPoint = "/api/fetchNeighborhoods";
    return this.http.get(BACKEND_URL + endPoint).pipe(
      catchError(error => {
        console.log('Error fetching neighborhoods:', error);
        return throwError(error);
      })
    );;
  }

    // ---------------- NEIGHBORHOOD DETAILS PAGE ---------------- //

  fetchOneNeighborhood(associationId: number) { 
    const endPoint = `/api/fetchOneNeighborhood/${associationId}`;
    return this.http.get(BACKEND_URL + endPoint).pipe(
      catchError(error => {
        console.log('Error fetching one neighborhood:', error);
        return throwError(error);
      })
    );;
  }

  // ---------------- ADD NEIGHBORHOOD PAGE ---------------- //

  createNeighborhood(neighborhoodObj: object) {
    const endPoint = "/api/createNeighborhood";
    const payload = neighborhoodObj;
    return this.http.post(BACKEND_URL + endPoint, payload).pipe(
      catchError(error => {
        console.log('Error creating neighborhood:', error);
        return throwError(error);
      })
    );
  }


  // ---------------- EDIT NEIGHBORHOOD PAGE ---------------- //

  updateNeighborhood(associationId: number, neighborhoodObj: object){
    const endPoint = `/api/updateNeighborhood/${associationId}`;
    const payload = neighborhoodObj;
    return this.http.put(BACKEND_URL + endPoint, payload).pipe(
      catchError(error => {
        console.log('Error updating neighborhood:', error);
        return throwError(error);
      })
    );
  }

  deleteNeighborhood(associationId: number) {
    const endpoint = `/api/deleteNeighborhood/${associationId}`;
    return this.http.delete(BACKEND_URL + endpoint).pipe(
      catchError(error => {
        console.error('Error deleting neighborhood:', error);
        return throwError(error);
      })
    );
  }
}



