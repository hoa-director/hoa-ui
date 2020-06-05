import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { tap, catchError, map } from "rxjs/operators";
import { Observable, of, ReplaySubject, BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { response } from "express";
import { asObservable } from "./asObservable";

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userSubject = new BehaviorSubject<any>("");
  // user;
  userUpdated: EventEmitter<string> = new EventEmitter();
  currentAssociation;
  currentAssociationUpdated: EventEmitter<string> = new EventEmitter();

  // auth properties
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private authErrorListener = new Subject<string>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  // loading properties
  private loadingStatusListener = new BehaviorSubject<boolean>(false);
  private isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  // allow other components to get the token from this service
  getToken() {
    return this.token;
  }

  // don't want to expose subject to components to prevent other components from being able to emit
  // Only want to emit from this service, but allow other to listen, so it is a private property
  // need to return the subject as an observable
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthErrorListener() {
    return this.authErrorListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getLoadingStatusListener() {
    return this.loadingStatusListener.asObservable();
  }

  setCurrentAssociation(id) {
    this.currentAssociation = id;
    this.currentAssociationUpdated.emit(this.currentAssociation);
  }

  setUser(user) {
    this.userSubject.next(user);
    this.userUpdated.emit(user);
  }

  loginUser(user) {
    this.setLoadingStatusListener(true);
    this.http
      .post<{ token: string; user: any; expiresIn: number }>(
        BACKEND_URL + "/user/login",
        user
      )
      .subscribe(
        (response) => {
          this.setUser(response.user);
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
            this.router.navigate(["/main", "directory"]);
          }
          // return 'success';
        },
        (error) => {
          if (error.status === 401) {
            this.authErrorListener.next("Username or password in incorrect.");
            return;
          }
          this.authErrorListener.next(
            "There was an error on the server. Please try again later"
          );
        }
      )
      .add(() => {
        this.setLoadingStatusListener(false);
      });

    // .pipe(
    //   tap((loginResponse) => {
    //     this.setUser(loginResponse.user);
    //     console.log(loginResponse.user);
    //     console.log(loginResponse.token);
    //     const token = loginResponse.token;
    //     this.token = token;
    //     return 'success';
    //   }),
    // );
    // this.http.post(BACKEND_URL + '/user/login', user).subscribe(response => {
    // })
  }

  // logout() {
  //   return this.http.get(BACKEND_URL + "/users/logout").pipe(
  //     tap(() => {
  //       this.setUser(undefined);
  //       this.router.navigate(["/login"]);
  //     })
  //   );
  // }

  autoAuthenticateUser() {
    const authInformation = this.getAuthDate();
    if (!authInformation) return;
    const now = new Date();
    // check to see if expiration date is in the future, if greater than now
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthenticatedTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.router.navigate(["/main", "directory"]);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl("/home");
  }

  private setAuthenticatedTimer(duration: number) {
    console.log("Setting timer: " + duration);
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

  getUser() {
    // if class variable is falsy get the user from the backend and
    // set the user by calling setUser
    // if (!this.user) {
    //   return this.http.get(BACKEND_URL + '/user').pipe(
    //     tap(user => {
    //       this.setUser(user);
    //     }),
    //     catchError((error) => {
    //       return of(false);
    //     })
    //   )
    // }
    // if this user does exist, return the user
    // else
    // {
    //   return of(this.user);
    // }
    return asObservable(this.userSubject);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      map((user) => {
        return !!user;
      })
    );
  }

  getUserAssociations(): Observable<any> {
    return this.getUser().pipe((user) => {
      if (!user) {
        return of({});
      }
      return this.http.get(
        BACKEND_URL +
          `/user/associations/?userId=${this.userSubject.getValue().id}`
      );
    });
  }

  selectAssociation(associationId): Observable<any> {
    return this.getUser().pipe((user) => {
      if (!user) {
        return of({});
      }
      return this.http
        .post(BACKEND_URL + "/user/associations/", { associationId })
        .pipe(
          tap(({ currentAssociation }) => {
            this.setCurrentAssociation(currentAssociation);
          })
        );
    });
  }

  requestToken(email) {
    return this.http.get(BACKEND_URL + "/users/forgotten", {
      params: {
        email,
      },
    });
  }

  changeForgottenPassword({ password, token }) {
    return this.http.post(BACKEND_URL + "/users/forgotten", {
      password,
      token,
    });
  }

  private setLoadingStatusListener(isLoading: boolean): void {
    this.loadingStatusListener.next(isLoading);
  }
}
