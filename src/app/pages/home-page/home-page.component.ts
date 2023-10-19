import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from 'src/app/core/services/post.service';
import { Router } from '@angular/router';
import { PostResponse } from 'src/app/core/interfaces/Post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private postService: PostService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.cookieService.check('auth_key')) {
      this.router.navigate(['/login']);
      return;
    }

    this.postService.getAllPosts().subscribe((data: any) => {
      console.log(data);
    });
  }
}
