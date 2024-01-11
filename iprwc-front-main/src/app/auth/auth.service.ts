import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {Endpoint} from "../shared/data-storage/endpoint.enum";
import {HeaderSetupService} from "../shared/header-setup.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  expiresIn: string;
  localId: string;
}

export interface RoleResponseData {
  role: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<User|null>(null);
  private tokenExpirationTimer: any;
  constructor(private router: Router,private http: HttpClient, private header: HeaderSetupService) {
  }

  getRole(){
    return this.http.get<RoleResponseData>(Endpoint.SIGNUP + "/role", {headers: this.header.setUpHeader()});
  }

  signup(email: string, password: string){
    return this.http.post(Endpoint.SIGNUP,
      {
        email: email,
        password: password
      }).pipe(catchError(this.handleError), tap(resData => {

      }));
  }

  login(email: string, password: string){
    return this.http
      .post<AuthResponseData>(Endpoint.LOGIN,
        {
          email: email,
          password: password
        })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid credentials';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid credentials';
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const storedDataString = localStorage.getItem('userData');
    let userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } | null = null;
    if (storedDataString !== null) {
      try {
        userData = JSON.parse(storedDataString);
      } catch (error) {
      }

      if (!userData) {
        return;
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }
}
