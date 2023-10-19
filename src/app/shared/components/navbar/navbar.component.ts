import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public hideLogout: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  handleLogoutClick(): void {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }

  checkRoute(): void {
    const currentRoute = this.activatedRoute.snapshot.firstChild?.url[0]?.path;
    if (currentRoute === 'login' || currentRoute === 'register') {
      this.hideLogout = true;
    } else {
      this.hideLogout = false;
    }
  }
}
