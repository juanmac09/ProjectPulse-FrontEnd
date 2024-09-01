import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService {
  private endPoint: string = '/project/created';
  constructor(private HttpService: RequestHttpService) {}

  /**
   * createProject function creates a new project by sending a POST request to the specified endpoint with the provided project data.
   *
   * @param projectData - The data of the new project to be created.
   * @returns An Observable that emits the response from the server after the project is created.
   */
  createProject(projectData: any): Observable<any> {
    return this.HttpService.postData(this.endPoint, projectData).pipe(tap());
  }
}
