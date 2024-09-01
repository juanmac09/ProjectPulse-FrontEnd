import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private endPoind: string = '/project/all';
  constructor(private httpService: RequestHttpService) {}

  /**
   * This method fetches a list of projects from the server.
   * @param {number} page - The page number of the projects to fetch.
   * @param {number} size - The number of projects to fetch per page.
   * @returns {Observable<any>} - An Observable that emits an array of project data upon completion.
   */
  getProjects(page: number, size: number): Observable<any> {
    return this.httpService.getData(
      this.endPoind + '?page=' + page + '&size=' + size
    );
  }
}
