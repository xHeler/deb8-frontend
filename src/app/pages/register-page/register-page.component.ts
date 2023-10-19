import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserRegister } from 'src/app/core/interfaces/UserRegister';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  userRegisterData: UserRegister = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {
      this.userService.registerUser(this.userRegisterData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('There was an error during the registration:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    }
  }
}
