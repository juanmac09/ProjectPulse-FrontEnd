import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserStoryService {
  private endPoint: string = '/user-story/update/';
  constructor(private httpService: RequestHttpService) {}

  /**
   * Method to update a user story.
   *
   * @param {number} id - ID of the user story to be updated.
   * @param {any} userStoryData - Data for updating the user story.
   * @returns {Observable<any>} - Observable that emits the updated user story data.
   */
  UpdateUserStory(id: number, userStoryData: any): Observable<any> {
    return this.httpService.putData(this.endPoint + id, userStoryData);
  }
}
