import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    if (!this.cookieService.check('auth_key')) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
