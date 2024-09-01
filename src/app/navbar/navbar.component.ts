import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/authService/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  /**
   * The `logout` method is responsible for logging the user out of the application.
   * It calls the `logOut` method of the `AuthService` service, which handles the actual logout process.
   *
   * @param {void} - No input arguments are required for this method.
   * @returns {void} - This method does not return any data. It only triggers the logout process.
   */
  logout() {
    this.authService.logOut();
  }
}
