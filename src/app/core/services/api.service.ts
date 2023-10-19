import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl: string = '/api/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.cookieService.get('auth_key');
    if (token) {
      headers = headers.set('Authorization', 'token ' + token);
    }
    return headers;
  }

  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint, {
      headers: this.getHeaders(),
    });
  }

  post(endpoint: string, data: any) {
    return this.http.post(this.baseUrl + endpoint, data, {
      headers: this.getHeaders(),
    });
  }

  delete(endpoint: string, data: any) {
    const options = {
      headers: this.getHeaders(),
      body: data,
    };
    return this.http.request('DELETE', this.baseUrl + endpoint, options);
  }
}
