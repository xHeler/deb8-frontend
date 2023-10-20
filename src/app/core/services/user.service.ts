import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/UserLogin';
import { UserRegister } from '../interfaces/UserRegister';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = '/api/auth/';
  private readonly LOGIN_ENDPOINT = 'login/';
  private readonly REGISTRATION_ENDPOINT = 'registration/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUsername(): string {
    const username = this.cookieService.get('username');
    if (username) {
      return username;
    }
    return '';
  }

  logoutUser(): void {
    this.cookieService.delete('username');
    this.cookieService.delete('auth_key');
  }

  loginUser(userLoginData: UserLogin): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.BASE_URL + this.LOGIN_ENDPOINT, userLoginData, {
      headers: headers,
      withCredentials: true,
    });
  }

  registerUser(userRegisterData: UserRegister): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(
      this.BASE_URL + this.REGISTRATION_ENDPOINT,
      userRegisterData,
      {
        headers: headers,
        withCredentials: true,
      }
    );
  }

  private createHeaders(): HttpHeaders {
    const csrfToken = this.cookieService.get('csrftoken');
    if (!csrfToken) {
      throw new Error('CSRF token is missing!');
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });
  }
}
