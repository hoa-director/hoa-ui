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




  fetchUsers() { 
    // console.log(`fetchRules() EndPoint: ${BACKEND_URL}`+"/api/rules");
    return this.http.get(BACKEND_URL + "/api/users");
    // return this.http.get(BACKEND_URL + "/api/users", {
    //   params: new HttpParams().set(
    //     "associationId",
    //     sessionStorage.getItem("associationId").toString()
    //   ),
    // });
    
  }






}



