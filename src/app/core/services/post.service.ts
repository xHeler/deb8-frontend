import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PostResponse } from '../interfaces/Post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService extends APIService {
  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, cookieService);
  }

  getAllPosts(): Observable<PostResponse> {
    return this.get('posts/').pipe(map((data) => data as PostResponse));
  }
}
