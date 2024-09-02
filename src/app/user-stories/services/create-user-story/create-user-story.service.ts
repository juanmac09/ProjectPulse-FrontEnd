import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateUserStoryService {
  private endPoint: string = '/user-story/create';
  constructor(private httpService: RequestHttpService) {}

  /**
   * @description This method creates a new user story by sending a POST request to the specified endpoint with the provided user story data.
   * @param {any} userStoryData - The data containing the details of the new user story.
   * @returns {Observable<any>} - An observable that emits the response from the server after creating the user story.
   */
  createUserstory(userStoryData: any): Observable<any> {
    return this.httpService.postData(this.endPoint, userStoryData);
  }
}
