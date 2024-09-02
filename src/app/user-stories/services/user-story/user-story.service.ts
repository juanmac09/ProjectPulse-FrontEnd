import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoryService {
  private endPoint: string = '/user-story/all';
  constructor(private httpService: RequestHttpService) {}

  /**
   * Retrieves a paginated list of user stories.
   *
   * @param {number} page - The page number to retrieve.
   * @param {number} size - The number of user stories per page.
   * @returns {Observable<any>} - An observable that emits the paginated user stories.
   *
   * The `getUserStories` function sends a GET request to the server with the specified page and size parameters.
   * It then returns an observable that emits the paginated user stories.
   * In the example usage, the function is subscribed to and the user stories are logged to the console.
   */
  getUserStories(page: number, size: number): Observable<any> {
    return this.httpService.getData(
      this.endPoint + '?page=' + page + '&size=' + size
    );
  }
}
