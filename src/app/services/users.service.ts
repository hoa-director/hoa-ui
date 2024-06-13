import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }




  fetchUsers(inputName: string) { 
    const endPoint = "/api/fetchUsers"
      // const params = new HttpParams()
      // .set('associationId',sessionStorage.getItem("associationId").toString()) // -- get from session
      // .set('associationId', associationId.toString())  // -- get from previous function
      // console.log('inputName:', inputName );
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: [associationId], // -- associationIds MUST be un an array to work.
            firstName: inputName
          }
          console.log('payload', payload);
          console.log('firstName:', payload.firstName);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }


// -- THIS WORKS
// createTestRow(associationId: number) {
//   const endPoint = "/api/getUsers"
//   console.log(`createTestRow() EndPoint: ${BACKEND_URL}`+ endPoint);
//   const payload = {
//     associationId: associationId, 
//   }
//     return this.http.post(BACKEND_URL + endPoint, payload
//   );
// }



}



