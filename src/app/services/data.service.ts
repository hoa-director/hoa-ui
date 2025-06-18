import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class DataService {
  private rulesListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
      private router: Router,
    
  ) {}


  getCurrentUrl(): string {
    return this.router.url; // Returns the current URL as a string
  }
  
  // -- GET ORGANIZATION ROLES
  fetchOrganizationRoles() { 
    const endPoint = "/api/getRoles"
      // const organizationId = sessionStorage.getItem("associationId").toString()
      const payload = {
        organizationId: sessionStorage.getItem("associationId").toString(), // -- associationIds MUST be un an array to work.
      }
      console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }

  // -- GET ONE ORGANIZATION ROLE ------ NOT BEING USED YET???
  fetchOneOrganizationRole() { 
    const endPoint = "/api/getOneRole"
    const organizationId = sessionStorage.getItem("associationId").toString()
    const payload = {
      organizationId: sessionStorage.getItem("associationId").toString(), // -- associationIds MUST be un an array to work.
    }
    console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }
  
  // -- Get Current Users Permissions for hiding front-end UI elements ONLY
  fetchCurrentUserPermission(pageURLink: string) { 
    const endPoint = "/api/currentUserPermission"

    // const parts = this.getCurrentUrl().split('/'); 
    // const pageURL = parts[parts.length - 2 ]; 
    // console.log('new_pageURL', pageURLink);
    const payload = {
      organizationId: sessionStorage.getItem("associationId").toString(), // -- associationIds MUST be un an array to work.
      pageURL: pageURLink,
    }
    // console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }


  // -- Get Current Users Permissions for hiding front-end SIDEBAR LINKS
  fetchCurrentUserSideBarPermission() { 
    const endPoint = "/api/currentUserSideBarPermission"
    const payload = {
      organizationId: sessionStorage.getItem("associationId").toString(), // -- associationIds MUST be un an array to work.
    }
    // console.log('PAYLOAD:', payload);
    return this.http.post(BACKEND_URL + endPoint, payload );
  }
  





  // ---------------- VIEW UNITS PAGE ---------------- //
  // -- UNITS API ENDPOINT -- default when page opens
  fetchUnits(inputString: string) {
    const associationId = sessionStorage.getItem("associationId").toString()
    const payload = {
      associationId: associationId,
      inputString: inputString // -- MUST match database!
    }
    return this.http.post(BACKEND_URL + "/api/directory", payload)
  }

  // -- USERS API ENDPOINT
  fetchUnitsByUserAPI(inputString: string) { 
    const endPoint = "/api/directoryByUser"
      // .set('associationId',sessionStorage.getItem("associationId").toString()) // -- get from session
      // .set('associationId', associationId.toString())  // -- get from previous function
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: [associationId], // -- associationIds MUST be un an array to work.
            inputString: inputString
          }
    return this.http.post(BACKEND_URL + endPoint, payload );
  }

  searchUnits(inputString: string) {
    const associationId = sessionStorage.getItem("associationId").toString();
    const payload = { associationId, inputString };
    return this.http.post(BACKEND_URL + "/api/directory-search", payload);
  }


  // ---------------- EDIT UNIT PAGE ---------------- //

  // --User Dropdown -- // --  COME BACK TO THIS

  // fetchAvailableUsers(){
  //   const endPoint = "/api/fetchUsers"
  //   const associationId = sessionStorage.getItem("association").toString()
  //   const payload = {
  //     associationId: associationId,
  //   }
  //   return this.http.post(BACKEND_URL + endPoint, payload);
  // }


  // -- GET ONE UNIT
  fetchOneUnit(unitId: number) { 
    const endPoint = "/api/getUnit"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
            unitId: unitId 
          }
    return this.http.post(BACKEND_URL + endPoint, payload );
  }


  addUnit(unit: object) { 
    const payload = unit
    return this.http.post(BACKEND_URL + '/api/addUnit', payload ) 
  }

    // --UPDATE USER STATUS
    updateUnitStatus(currentUnitId: number, unitStatus: boolean){
      console.log('currentUnitId:', currentUnitId);
      const endPoint = "/api/updateUnitStatus"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
            currentUnitId: currentUnitId,
            unitStatus: unitStatus
          }
    return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
      catchError((error) => {
        console.error('Update Unit Status API failed.', error);
        return throwError(error);
      })
    );
    }

     // -- UPDATE UNIT INFO
     updateUnit(unitObj: any, ){
      console.log('USEOBJ:', unitObj);
      const endPoint = "/api/updateUnit"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
            unitId: unitObj.unitId,
            unitUpdates: unitObj
          }
    return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
      catchError((error) => {
        console.error('Update User API failed.', error);
        return throwError(error);
      })
    );
    }


     // -- AVAILABLE USERS DROPDOWN 
     getAvailableUsers(){
      const endPoint = "/api/getAvailableUsers"
      const associationId = sessionStorage.getItem("associationId").toString()
      const payload = {
            associationId: associationId, 
          }
    return this.http.post(BACKEND_URL + endPoint, payload ).pipe(
      catchError((error) => {
        console.error('availableUsers API failed.', error);
        return throwError(error);
      })
    );
    }

  // EDIT OWN PHONE NUMBERS
  updatePhoneFields(phoneObj: any, userId: number) {
    const endPoint = "/api/updatePhoneFields";
    const payload = { phoneObj, userId };
    return this.http.put(BACKEND_URL + endPoint, payload).pipe(
      catchError((error) => {
        console.log('Error updating user phone fields', error);
        return throwError(error);
      })
    );  
  }

  // GET OWN PHONE NUMBER FIELDS BY USER ID
  getPhoneFields(userId: number) {
    const endPoint = "/api/getPhoneFields";
    const payload = { userId };
    return this.http.post(BACKEND_URL + endPoint, payload).pipe(
      catchError((error) => {
        console.log('Error fetching phone fields', error);
        return throwError(error);
      })
    );
  }

  // DELETE ONE FROM UNITS
  deleteUnit(unitId: number) {
    return this.http.delete(BACKEND_URL + `/api/deleteUnit/${unitId}`).pipe(
      catchError((error) => {
        console.log('Error deleting unit:', error);
        return throwError(error);
      })
    );
  }


   // ---------------- DOCUMENTS PAGE ---------------- //
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
  
    fetchRules() { 
      // console.log(`fetchRules() EndPoint: ${BACKEND_URL}`+"/api/rules");
      return this.http.get(BACKEND_URL + "/api/rules", {
        params: new HttpParams().set(
          "associationId",
          sessionStorage.getItem("associationId").toString()
        ),
      });
    }

 // -- THIS WORKS
    fetchRows() { 
      // console.log(`fetchRules() EndPoint: ${BACKEND_URL}`+"/api/rules");
      return this.http.get(BACKEND_URL + "/api/getTestRows"); 
      // return this.http.get(BACKEND_URL + "/api/users");  // -- TESTING Get All Users
    }


// -- TESTING
  deleteRowAPI(thing1: string) {
    // const endPoint = "/api/deleteRowAPI"
    // console.log(`createTestRow() EndPoint: ${BACKEND_URL}`+ endPoint);
    const payload = {
      column1string: thing1
    }
      return this.http.post(BACKEND_URL + "/api/deleteRowAPI", payload );
  }


// -- THIS WORKS
  createTestRow(thing1: string, thing2: boolean, thing3: number) {
    const endPoint = "/api/createRow"
    // console.log(`createTestRow() EndPoint: ${BACKEND_URL}`+ endPoint);
    const payload = {
      column1string: thing1, 
      column2boolean: thing2, 
      column3int: thing3
    }
      return this.http.post(BACKEND_URL + "/api/createRow", payload );
  }

  // -- THIS WORKS
  updateRow(column1string: string ) { 
    // console.log('update value"', column1string);
    // console.log(`updateRow() EndPoint: ${BACKEND_URL}` + "/api/updateRow");
    const payload = {
      column1string: column1string, 
    }
    return this.http.post(BACKEND_URL + "/api/updateRow", payload );
  }



}
