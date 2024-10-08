import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RequestHttpService {
  private apiUrl = environment.API_URL;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  /**
   * Gets data from the API endpoint with optional query parameters.
   *
   * @param endpoint The API endpoint to fetch data from.
   * @param params Optional query parameters to append to the request.
   * @returns An Observable that emits the fetched data.
   */
  getData(endpoint: string, params: any = {}): Observable<any> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      queryParams = queryParams.append(key, params[key]);
    });

    return this.http.get<any>(this.apiUrl + endpoint, {
      headers: this.headers,
      params: queryParams,
    });
  }
  /**
   * Posts data to the specified API endpoint.
   *
   * @param endpoint The API endpoint to send the data to.
   * @param data The data to be sent in the request body.
   * @returns An Observable that emits the response data from the API.
   */
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, data,{ headers: this.headers});
  }

  /**
   * Updates data at the specified API endpoint.
   *
   * @param endpoint The API endpoint to update the data at.
   * @param data The updated data to be sent in the request body.
   * @returns An Observable that emits the response data from the API.
   */
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + endpoint, data,{ headers: this.headers });
  }
}
