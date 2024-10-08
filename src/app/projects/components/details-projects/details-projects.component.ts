import { Component, OnInit } from '@angular/core';
import { UpdateProjectsComponent } from '../update-projects/update-projects.component';
import { CreateUserStoriesComponent } from '../../../user-stories/components/create-user-stories/create-user-stories.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../interfaces/project';
import { StatusMessageComponent } from '../../../helpers/messages/status-message/status-message.component';

@Component({
  selector: 'app-details-projects',
  standalone: true,
  imports: [
    UpdateProjectsComponent,
    CreateUserStoriesComponent,
    RouterLink,
    StatusMessageComponent,
  ],
  templateUrl: './details-projects.component.html',
  styleUrls: ['./details-projects.component.css'],
})
export class DetailsProjectsComponent implements OnInit {
  isModalOpen = false;
  isCreateStoryModalOpen = false;
  projectId: string | null = null;
  project: Project | null = null;
  statusMessage: string | null = null;
  successMessage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  /**
   * The `ngOnInit` lifecycle hook is called after the component's data-bound input properties have been initialized.
   * This is the place to initialize directive-specific logic.
   *
   * @param route - The `ActivatedRoute` instance provides access to the parameters and data of the current route.
   * @param projectService - The `ProjectService` instance is used to fetch project data from the server.
   * @param router - The `Router` instance is used to navigate between different routes.
   */
  ngOnInit(): void {
    // Subscribe to the `paramMap` observable of the `ActivatedRoute` instance.
    // The `paramMap` observable emits a `ParamMap` object containing the route parameters.
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
      // Check if the 'id' parameter is present.
      if (this.projectId) {
        // Call the `getProjectById` method with the 'id' parameter.
        this.getProjectById(this.projectId);
      }
    });
  }

  /**
   * The `openModal` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for toggling the visibility of a modal window.
   *
   * @param none - This method does not require any input arguments.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.openModal();
   * ```
   *
   * @description
   * When the `openModal` method is called, it sets the `isModalOpen` property of the `DetailsProjectsComponent` instance to `true`, effectively displaying the modal window.
   *
   * @example
   * ```html
   * <!-- In the component's template -->
   * <div *ngIf="isModalOpen">
   *   <!-- Modal content goes here -->
   * </div>
   * ```
   */
  openModal() {
    this.isModalOpen = true;
  }

  /**
   * The `closeModal` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for toggling the visibility of a modal window.
   *
   * @param none - This method does not require any input arguments.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.closeModal();
   * ```
   *
   * @description
   * When the `closeModal` method is called, it sets the `isModalOpen` property of the `DetailsProjectsComponent` instance to `false`, effectively hiding the modal window.
   */
  closeModal() {
    this.isModalOpen = false;
  }

  /**
   * The `openCreateStoryModal` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for toggling the visibility of a modal window for creating a new user story.
   *
   * @param none - This method does not require any input arguments.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.openCreateStoryModal();
   * ```
   *
   * @description
   * When the `openCreateStoryModal` method is called, it sets the `isCreateStoryModalOpen` property of the `DetailsProjectsComponent` instance to `true`, effectively displaying the modal window for creating a new user story.
   */
  openCreateStoryModal() {
    this.isCreateStoryModalOpen = true;
  }

  /**
   * The `closeCreateStoryModal` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for toggling the visibility of a modal window for creating a new user story.
   *
   * @param none - This method does not require any input arguments.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.closeCreateStoryModal();
   * ```
   *
   * @description
   * When the `closeCreateStoryModal` method is called, it sets the `isCreateStoryModalOpen` property of the `DetailsProjectsComponent` instance to `false`, effectively hiding the modal window for creating a new user story.
   */
  closeCreateStoryModal() {
    this.isCreateStoryModalOpen = false;
  }

  /**
   * The `getProjectById` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for fetching a project by its ID from the server.
   *
   * @param projectId - The `projectId` parameter is a string representing the ID of the project to be fetched.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.getProjectById('123');
   * ```
   *
   * @description
   * The `getProjectById` method first converts the `projectId` parameter from a string to a number using the `parseInt` function.
   * Then, it calls the `getProjectById` method of the `ProjectService` instance with the converted `projectId` as an argument.
   * The `subscribe` method is used to listen for the response from the server.
   * If the response contains data, the `project` property of the `DetailsProjectsComponent` instance is set to the fetched project data.
   * If the response does not contain data, the `router` property of the `DetailsProjectsComponent` instance is used to navigate to the `/projects` route.
   * If an error occurs during the request, the `router` property of the `DetailsProjectsComponent` instance is used to navigate to the `/projects` route.
   */
  getProjectById(projectId: string) {
    const id = parseInt(projectId, 10);
    this.projectService.getProjectById(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.project = response.data;
        } else {
          this.router.navigate(['/projects']);
        }
      },
      error: () => {
        this.router.navigate(['/projects']);
      },
    });
  }

  /**
   * The `handleProjectUpdate` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for handling the update of a project.
   *
   * @param updateProject - The `updateProject` parameter is an object representing the updated project data.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.handleProjectUpdate({ id: 1, name: 'New Project Name' });
   * ```
   *
   * @description
   * The `handleProjectUpdate` method first calls the `closeModal` method to hide the modal window.
   * Then, it sets the `project` property of the `DetailsProjectsComponent` instance to the updated project data.
   * After that, it sets the `statusMessage` property to a success message and the `successMessage` property to `true`.
   * Finally, it uses the `setTimeout` method to clear the `statusMessage` property after 3 seconds.
   */
  handleProjectUpdate(updateProject: any): void {
    this.closeModal();
    this.project = updateProject;
    this.statusMessage = 'Se actualizó exitosamente';
    this.successMessage = true;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  /**
   * The `handleError` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for handling errors that occur during the update of a project.
   *
   * @param error - The `error` parameter is an object representing the error that occurred during the update process.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.handleError(new Error('Network error'));
   * ```
   *
   * @description
   * The `handleError` method first calls the `closeModal` method to hide the modal window.
   * Then, it sets the `statusMessage` property to an error message and the `successMessage` property to `false`.
   * Finally, it uses the `setTimeout` method to clear the `statusMessage` property after 3 seconds.
   */
  handleError(error: any): void {
    this.closeModal();
    this.closeCreateStoryModal();
    this.statusMessage = 'Error, intente más tarde';
    this.successMessage = false;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  /**
   * The `handleUserStoryCreate` method is a public method of the `DetailsProjectsComponent` class.
   * It is responsible for handling the creation of a new user story.
   *
   * @param userStoryCreate - The `userStoryCreate` parameter is an object representing the new user story data.
   *
   * @returns none - This method does not return any value.
   *
   * @example
   * ```typescript
   * // Inside a component's method
   * this.detailsProjectsComponent.handleUserStoryCreate({ id: 1, name: 'New User Story' });
   * ```
   *
   * @description
   * The `handleUserStoryCreate` method first calls the `closeModal` method to hide the modal window.
   * Then, it calls the `closeCreateStoryModal` method to hide the modal window for creating a new user story.
   * After that, it sets the `statusMessage` property to a success message and the `successMessage` property to `true`.
   * Finally, it uses the `setTimeout` method to clear the `statusMessage` property after 3 seconds.
   */
  handleUserStoryCreate(userStoryCreate: any): void {
    this.closeCreateStoryModal();
    this.statusMessage = 'la historia de usuario se creo exitosamente';
    this.successMessage = true;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  
}
