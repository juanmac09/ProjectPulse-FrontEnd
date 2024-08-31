import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestHttpService } from '../../../http/request-http.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authEndpoint = '/auth/login'; 
  private tokenKey = 'authToken';
  constructor(private requestHttpService: RequestHttpService, private router: Router) {}

  login(credencials:{email: string, password: string}):Observable<any>{

    return this.requestHttpService.postData(this.authEndpoint,credencials).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    )
  }

  private setToken(token:string):void{
    localStorage.setItem(this.tokenKey, token);
  }


  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }


  isAuthenticated(): boolean {

    const token = this.getToken();
    if (!token) {
        return false;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now()< exp;

  }



  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
