import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserLogin } from 'src/app/core/interfaces/UserLogin';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  userLoginData: UserLogin = {
    username: '',
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.userService.loginUser(this.userLoginData).subscribe(
        (response) => {
          console.log(response);
          if (response && response.key) {
            this.cookieService.set('auth_key', response.key);
            var username = this.userLoginData.username;
            this.cookieService.set('username', username);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('There was an error during the login:', error);
          this.errorMessage = 'Invalid login credentials.';
        }
      );
    }
  }
}
