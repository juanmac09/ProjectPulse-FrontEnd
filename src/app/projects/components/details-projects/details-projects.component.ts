import { Component, OnInit } from '@angular/core';
import { UpdateProjectsComponent } from '../update-projects/update-projects.component';
import { CreateUserStoriesComponent } from '../../../user-stories/components/create-user-stories/create-user-stories.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';

interface Project {
  id: number;
  name: string;
  description: string;
  generalCompany: {
    id: number;
    name: string;
  };
}

@Component({
  selector: 'app-details-projects',
  standalone: true,
  imports: [UpdateProjectsComponent, CreateUserStoriesComponent, RouterLink],
  templateUrl: './details-projects.component.html',
  styleUrls: ['./details-projects.component.css'],
})
export class DetailsProjectsComponent implements OnInit {
  isModalOpen = false;
  isCreateStoryModalOpen = false;
  projectId: string | null = null;
  project: Project | null = null;

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
      // Get the 'id' parameter from the `ParamMap` object.
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
}
