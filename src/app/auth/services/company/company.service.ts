import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private endPoint: string = '/company/all';
  constructor(private HttpService: RequestHttpService) {}

  /**
   * getAllCompanies - This method retrieves a list of all companies from the server.
   * It takes two optional parameters: 'page' and 'size'. The default values for these parameters are 0 and 100, respectively.
   * The method uses the HttpService to make a GET request to the '/company/all' endpoint, appending the 'page' and 'size' query parameters to the URL.
   * The method returns an Observable that emits the response data from the server.
   *
   * @param {number} [page=0] - The page number of the results to retrieve. Default is 0.
   * @param {number} [size=100] - The number of results to retrieve per page. Default is 100.
   * @returns {Observable<any>} - An Observable that emits the response data from the server.
   */
  getAllCompanies(page: number = 0, size: number = 100): Observable<any> {
    return this.HttpService.getData(
      this.endPoint + '?page=' + page + '&size=' + size
    );
  }
}
