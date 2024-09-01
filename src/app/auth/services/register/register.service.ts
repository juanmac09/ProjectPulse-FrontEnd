import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable, tap } from 'rxjs';

interface userData {
  email: string;
  password: string;
  name: string;
  company: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private endpoints: string = '/auth/signup';
  constructor(private httpService: RequestHttpService) {}

  /**
   * The `registerUser` method is an injectable service that allows registering a new user in the application.
   * It takes an `userData` object as input, which contains the user's email, password, name, and the ID of the company they belong to.
   * The method sends a POST request to the `/auth/signup` endpoint using the `httpService` to register the new user.
   * The method returns an `Observable<any>` that emits the response from the server after the registration is completed.
   * The `tap` operator is used to perform side effects, such as logging or error handling, on the observable stream.
   *
   * @param userData - An object containing the user's registration data.
   * @returns An `Observable<any>` that emits the response from the server after the registration is completed.
   */
  registerUser(userData: userData): Observable<any> {
    return this.httpService.postData(this.endpoints, userData).pipe(tap());
  }
}
