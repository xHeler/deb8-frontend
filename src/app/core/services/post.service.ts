import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PostResponse } from '../interfaces/Post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LikeResponse } from '../interfaces/LikeResponse';

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

  likePost(postId: string): Observable<LikeResponse> {
    const formData: FormData = new FormData();
    formData.append('post', postId);
    return this.post('likes/create/', formData).pipe(
      map((data) => data as LikeResponse)
    );
  }

  unlikePost(postId: string): Observable<LikeResponse> {
    const formData: FormData = new FormData();
    formData.append('post', postId);
    return this.delete('likes/delete/', formData).pipe(
      map((data) => data as LikeResponse)
    );
  }

  createPost(title: string, image: File, description: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('image', image, image.name);
    formData.append('description', description);
    return this.post('posts/create/', formData);
  }

  removePost(postId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('post_id', postId);
    return this.delete('posts/delete/', formData).pipe(
      map((data) => data as LikeResponse)
    );
  }
}
