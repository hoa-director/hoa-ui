import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersCenterService {

  constructor(
    private http: HttpClient,
  ) { }


  // ---------------- VIEW USERS PAGE ---------------- //

  // -- GET ORGANIZATION ROLES
  fetchOrganizationRoles() { 
    const endPoint = "/api/getRoles"
      const organizationId = sessionStorage.getItem("associationId").toString()
      const payload = {
        organizationId: organizationId, // -- associationIds MUST be un an array to work.
      }
    return this.http.post(BACKEND_URL + endPoint, payload );
  }
  

  // --  GET ALL USERS
  fetchUsers(inputString: string) { 
    const endPoint = "/api/fetchUsers"
      // .set('associationId',sessionStorage.getItem("associationId").toString()) // -- get from session
      // .set('associationId', associationId.toString())  // -- get from previous function
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: [associationId], // -- associationIds MUST be un an array to work.
            inputString: inputString
          }
    return this.http.post(BACKEND_URL + endPoint, payload );
  }


  createUser(userObj: object) {
    // ---- ADD userObj{} HERE TO TEST ---- 
    const payload = userObj
    return this.http.post(BACKEND_URL + "/api/createUser", payload );
  }

 // ---------------- EDIT USER PAGE ---------------- //
    // -- GET ONE USER
    fetchOneUser(userId: number) { 
      const endPoint = "/api/getUser"
        const associationId = sessionStorage.getItem("associationId").toString()
        const payload = {
              associationId: associationId, 
              userId: userId
            }
      return this.http.post(BACKEND_URL + endPoint, payload );
    }

    updateUser(userObj: any){
      console.log('USEROBJ:', userObj);
      const endPoint = "/api/updateUser"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
            userId: userObj.userId,
            userUpdates: userObj
          }
          console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
      catchError((error) => {
        console.error('Update User API failed.', error);
        return throwError(error);
      })
    );
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



