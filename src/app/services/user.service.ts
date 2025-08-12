import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { map, shareReplay } from "rxjs/operators";
import { Observable, of, ReplaySubject, BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { asObservable } from "./asObservable";
import { isLoading } from "../shared/isLoading";
import { UserModel } from "app/models/user.model";
import { AssociationModel } from "app/models/association.model";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly userSubject = new BehaviorSubject<string>(null);
  readonly user$ = this.userSubject.asObservable();

  // auth properties
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private authErrorListener = new Subject<string>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  // available association properties
  // private availableAssociationsSubject = new ReplaySubject<AssociationModel[]>(1);
  // public availableAssociations$ = this.availableAssociationsSubject.asObservable();

  // selected association properties
  private readonly selectedAssociationSubject = new BehaviorSubject<string>(null);
  public selectedAssociation$ = this.selectedAssociationSubject.asObservable();


  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  // allow other components to get the token from this service
  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return asObservable(this.authStatusListener);
  }

  getAuthErrorListener() {
    return asObservable(this.authErrorListener);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  private setUser(userName: string) {
    this.userSubject.next(userName);
  }

  getUser(): string {
    return this.userSubject.getValue();
  }

  loginUser(user) {
    isLoading(true);
    this.http
      .post<{
        token: string;
        user: any;
        association: AssociationModel;
        expiresIn: number;
      }>(BACKEND_URL + "/user/login", user)
      .subscribe(
        (response) => {
          // console.log('loginUser() Response:', response);
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn; // 3600 seconds number from token expiration
            this.setAuthenticatedTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate);
            this.saveUserData(response.user.userId, response.user.roleTitle);  
            // this.saveUserData(response.user.name );  // -- save users firstName instead of id
            this.getLoggedInUser();
            // this.setSelectedAssociation({id: response.associationId, name: response.a});
            this.saveUserAssociationData(response.association.id, response.association.name);
            this.setSelectedAssociationSubject(response.association.name);
            this.router.navigate(["/home", "directory", "view"]); // -- First page after login
          }
          // return 'success';
        },
        (error) => {
          if (error.status === 401) {
            this.authErrorListener.next("Username or password is incorrect");
            return;
          }
          this.authErrorListener.next(
            "There was an error on the server. Please try again later"
          );
        }
      )
      .add(() => {
        isLoading(false);
      });
  }

  autoAuthenticateUser() {
    const authInformation = this.getAuthDate();
    if (!authInformation) return;
    const now = new Date();
    // check to see if expiration date is in the future, if greater than now

    // ADD THIS LATER ------ Check if user Role in jwt matches database. If not, logout. ------ ADD THIS LATER  

    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthenticatedTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      // this.router.navigate(["/home", "directory"]);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.clearUserDate();
    this.router.navigateByUrl("/landing");
  }

  // -- For Frontend Header Element
  getLoggedInUser(): void {
    this.http
      .get<{ userFirstName: string, userRole: number, associationName: string  }>(BACKEND_URL + "/user/loggedInUser", 
      // -- turned off 1/18/25 ---------
      //   {
      //   params: new HttpParams().set(
      //     // "userId", sessionStorage.getItem("userId").toString()  // -- Don't save user Id to storage
      //     "tokenParam",this.token // change to this, send token instead(in the header)
      //   ),
      // }
    )
      .subscribe((response) => {
        // console.log('getLoggedInUser:', response);
        this.setUser(response.userFirstName);
        this.setSelectedAssociationSubject(response.associationName);
      });
  }

  private setAuthenticatedTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // need to convert second argument into milliseconds, multiply by 1000
  }

  // storing token and expiration to local storage so not get logged out after page refresh
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthDate() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private saveUserData(userId: number, roleTitle: string) {
    sessionStorage.setItem("userId", userId.toString());
    sessionStorage.setItem("roleTitle", roleTitle);
  }

  private saveUserAssociationData(associationId: number, associationName: string) {
    sessionStorage.setItem("associationId", associationId.toString());
    sessionStorage.setItem("associationName", associationName);
  }

  private clearUserDate() {
    sessionStorage.removeItem("userId");
  }

  private setSelectedAssociationSubject(associationName: string) {
    this.selectedAssociationSubject.next(associationName);
  }

  // -- For FrontEnd Header Element -- 
  getUserAssociations() {
    this.http
      .get<any>(
        BACKEND_URL +
          // `/user/associations?userId=${sessionStorage.getItem("userId")}` // -- Don't send userId in API url
          `/user/associations`
      )
      .subscribe((response) => {
        console.log('getUserAssociations_response:', response);
        return response;
      });
  }

  setAssociation(association: AssociationModel) {
    this.saveUserAssociationData(association.id, association.name);
    this.setSelectedAssociationSubject(association.name);
  }

  requestToken(email) {
    return this.http.get(BACKEND_URL + "/users/forgotten", {
      params: {
        email,
      },
    });
  }

  changeForgottenPassword({ password, token }) {
    return this.http.post<{ success: boolean }>(
      BACKEND_URL + "/users/forgotten",
      {
        password,
        token,
      }
    );
  }
}

