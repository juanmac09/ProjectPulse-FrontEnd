import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private endPoint: string = '/ticket/get/all';

  constructor(private httpService: RequestHttpService) {}
  /**
   * Retrieves a paginated list of user stories from the server.
   *
   * @param {number} page - The page number to retrieve.
   * @param {number} size - The number of user stories per page.
   * @returns {Observable<any>} - An observable that emits the paginated user stories.
   *
   * The `getTickets` function sends a GET request to the server with the specified page and size parameters.
   * It constructs the request URL by concatenating the `endPoint` with the page and size query parameters.
   * The function then returns an observable that emits the paginated user stories.
   *
   * Example usage:
   * ```typescript
   * const pageNumber = 1;
   * const pageSize = 10;
   *
   * userStoryService.getTickets(pageNumber, pageSize).subscribe((userStories) => {
   *   console.log(userStories);
   * });
   * ```
   */
  getTickets(userStoryId: number, page: number, size: number): Observable<any> {
    return this.httpService.getData(
      this.endPoint + '?page=' + page + '&size=' + size
    );
  }
}
