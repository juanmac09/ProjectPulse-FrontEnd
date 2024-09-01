import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateProjectService {
  private endPoint: string = '/project/update/';
  constructor(private httpService: RequestHttpService) {}

  /**
   * Updates a project with the given ID and project data.
   * @param id The ID of the project to be updated.
   * @param projectData The updated project data.
   * @returns An Observable that emits the updated project data upon successful update.
   */
  updateProject(id: number, projectData: any): Observable<any> {
    // Construct the full endpoint URL by appending the project ID to the base endpoint.
    const fullEndpoint = this.endPoint + id;

    // Use the httpService's putData method to send a PUT request to the full endpoint with the provided project data.
    // The method returns an Observable that emits the updated project data upon successful update.
    return this.httpService.putData(fullEndpoint, projectData);
  }
}
