import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/UserLogin';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = '/api/auth/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  logoutUser() {
    this.cookieService.delete('auth_key');
  }

  loginUser(userLoginData: UserLogin): Observable<any> {
    const csrfToken = this.getCookie('csrftoken');

    if (!csrfToken) {
      throw new Error('CSRF token is missing!');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });

    const loginURL = this.URL + 'login/';
    return this.http.post(loginURL, userLoginData, {
      headers: headers,
      withCredentials: true,
    });
  }

  private getCookie(name: string): string | null {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop()?.split(';')[0] || null;
    }
    return null;
  }
}
