import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestHttpService } from '../../../http/request-http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEndpoint = '/auth/login';
  private tokenKey = 'authToken';
  constructor(
    private requestHttpService: RequestHttpService,
    private router: Router
  ) {}

  /**
   * This function sends a POST request to the server with the provided credentials.
   * If the response contains a token, it logs the token to the console and sets it in the local storage.
   * @param {Object} credencials - An object containing the user's email and password.
   * @returns {Observable<any>} - An observable that emits the response from the server.
   */
  login(credencials: { email: string; password: string }): Observable<any> {

    return this.requestHttpService
      .postData(this.authEndpoint, credencials)
      .pipe(

        tap((response) => {
          if (response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  /**
   * This function sets the provided token in the local storage using the key specified in the tokenKey property.
   * @param {string} token - The token to be stored in the local storage.
   */
  private setToken(token: string): void {

    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * This private function retrieves the token from the local storage using the key specified in the tokenKey property.
   * It first checks if the window object is defined, which indicates that the code is running in a browser environment.
   * If the window object is defined, it uses the getItem method of the localStorage object to retrieve the token with the key specified in the tokenKey property.
   * If the token is found, it is returned; otherwise, null is returned.
   * @returns {string | null} - The token retrieved from the local storage, or null if the token is not found.
   */
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * This function checks if the user is authenticated.
   * It retrieves the token from the local storage using the key specified in the tokenKey property.
   * If the token is found, it decodes the token and verifies its expiration time.
   * If the token is expired, the function returns false, indicating that the user is not authenticated.
   * Otherwise, the function returns true, indicating that the user is authenticated.
   * @returns {boolean} - True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  /**
   * This function logs the user out by removing the token from the local storage and redirecting the user to the login page.
   * It uses the removeItem method of the localStorage object to remove the token with the key specified in the tokenKey property.
   * After removing the token, it uses the navigate method of the Router object to redirect the user to the login page.
   * @returns {void} - This function does not return any value; it only performs the actions of logging the user out.
   */
  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
