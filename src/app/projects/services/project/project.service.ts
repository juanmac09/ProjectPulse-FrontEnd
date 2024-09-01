import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private endPoindAll: string = '/project/all';
  private endPoindById: string = '/project/';
  constructor(private httpService: RequestHttpService) {}

  /**
   * This method fetches a list of projects from the server.
   * @param {number} page - The page number of the projects to fetch.
   * @param {number} size - The number of projects to fetch per page.
   * @returns {Observable<any>} - An Observable that emits an array of project data upon completion.
   */
  getProjects(page: number, size: number): Observable<any> {
    return this.httpService.getData(
      this.endPoindAll + '?page=' + page + '&size=' + size
    );
  }

  /**
   * Retrieves a project by its unique identifier from the server.
   *
   * @param {number} id - The unique identifier of the project to retrieve.
   * @returns {Observable<any>} - An Observable that emits the project data upon completion.
   *
   * @example
   * // Fetching a project with id 123
   * projectService.getProjectById(123).subscribe((project) => {
   *   console.log(project); // Output: Project data with id 123
   * });
   */
  getProjectById(id: number): Observable<any> {
    return this.httpService.getData(this.endPoindById + id);
  }
}
