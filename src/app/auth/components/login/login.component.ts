import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  generalError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Validate inputs and handle the login process
   */
  onSubmit(): void {
    // Reset errors before validation
    this.resetErrors();

    // Validate inputs
    if (this.validateInputs()) {
      this.login();
    }
  }

  /**
   * Validate the email and password inputs
   * @returns {boolean} - Returns true if inputs are valid, false otherwise
   */
  private validateInputs(): boolean {
    let isValid = true;

    if (!this.credentials.email) {
      this.emailError = 'El correo electrónico es obligatorio.';
      isValid = false;
    } else if (!this.isValidEmail(this.credentials.email)) {
      this.emailError = 'Formato de correo electrónico no válido.';
      isValid = false;
    }

    if (!this.credentials.password) {
      this.passwordError = 'La contraseña es obligatoria.';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate the format of the email address
   * @param email - The email address to validate
   * @returns {boolean} - Returns true if the email format is valid, false otherwise
   */
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Function to handle user login.
   */
  private login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => this.handleError(error),
    });
  }

  /**
   * Reset all error messages
   */
  private resetErrors(): void {
    this.generalError = null;
    this.emailError = null;
    this.passwordError = null;
  }

  /**
   * Handle the error response and display the appropriate message
   * @param error - the error response from the server
   */
  private handleError(error: any): void {
    if (error.status === 401) {
      const errorData = error.error;

      if (errorData.title === 'Unauthorized' && errorData.status === 401) {
        if (errorData.detail === 'Bad credentials') {
          this.generalError =
            'El correo electronico o la contraseña son incorrectos.';
        } else {
          this.generalError =
            errorData.description ||
            'Datos inválidos. Por favor, verifique su información.';
        }
      } else {
        this.generalError =
          'Datos inválidos. Por favor, verifique su información.';
      }
    } else {
      this.generalError =
        'Error inesperado. Por favor, intente de nuevo más tarde.';
    }
  }
}
