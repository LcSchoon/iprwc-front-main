import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable({providedIn:'root'})
export class HeaderSetupService {
  public setUpHeader(): HttpHeaders {
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
    }
    return new HttpHeaders({
      'accept': 'application/json; utf-8',
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + userData?._token
    });
  }
}
