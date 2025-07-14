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
      console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }

  fetchRolesByAssociation(associationId: number) {
    const endPoint = "/api/fetchRolesByAssociation/" + associationId.toString();
    return this.http.get(BACKEND_URL + endPoint).pipe(
      catchError((error) => {
        console.error('Fetch roles by associationId error:', error);
        return throwError(error);
      })
    );
  }

  // -- GET ONE ORGANIZATION ROLE ------ NOT BEING USED YET???
  fetchOneOrganizationRole() { 
    const endPoint = "/api/getOneRole"
    // const organizationId =  sessionStorage.getItem("associationId").toString()
    const payload = {
      organizationId: sessionStorage.getItem("associationId").toString() // -- associationIds MUST be un an array to work.
    }
    console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }
  

  // --  GET ALL USERS
  fetchUsers(inputString: string) { 
    const payload = { inputString: inputString || '' };
    const endPoint = "/api/fetchUsers";
    return this.http.post(BACKEND_URL + endPoint, payload);
  }


   // ---------------- ADD USER PAGE ---------------- //

  getAllAssociations() {
    const endPoint = "/api/getAllAssociations";
    return this.http.get(BACKEND_URL + endPoint);
  }

  fetchVacantUnits(associationId: number) {
    const endPoint = `/api/fetchVacantUnits/${associationId}`;
    return this.http.get(BACKEND_URL + endPoint);
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
      const payload = { userId };
      return this.http.post(BACKEND_URL + endPoint, payload );
    }

    // --UPDATE USER STATUS
    updateUserStatus(currentUserId: number, userStatus: boolean){
      const endPoint = "/api/updateUserStatus"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
            currentUserId: currentUserId,
            userStatus: userStatus
          }
    return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
      catchError((error) => {
        console.error('Update User Status API failed.', error);
        return throwError(error);
      })
    );
    }
    

     // -- UPDATE USER INFO
    updateUser(userId: number, unitId: number, userObj: any){
      const endPoint = "/api/updateUser"
      const payload = {
            userId: userId,
            unitId: unitId,
            userUpdates: userObj
          }
    return this.http.put(BACKEND_URL + endPoint, payload ).pipe(
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



