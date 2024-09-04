import { Component } from '@angular/core';
import { CreateUserStoriesComponent } from '../create-user-stories/create-user-stories.component';
import { UpdateUserStoriesComponent } from '../update-user-stories/update-user-stories.component'; // Asegúrate de importar el componente de actualización
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserStoryService } from '../../services/user-story/user-story.service';
import { FormsModule } from '@angular/forms';
import { StatusMessageComponent } from '../../../helpers/messages/status-message/status-message.component';
import { UserStory } from '../../interfaces/user-story';

@Component({
  selector: 'app-user-stories',
  standalone: true,
  imports: [
    CreateUserStoriesComponent,
    UpdateUserStoriesComponent,
    RouterLink,
    FormsModule,
    StatusMessageComponent,
  ],
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css'],
})
export class UserStoriesComponent {
  isModalOpen = false;
  isUpdateModalOpen = false;
  statusMessage: string | null = null;
  successMessage: boolean = true;
  userStories: UserStory[] = [];
  page: number = 1;
  totalPage: number = 0;
  totalElements: number = 0;
  projectId: string | null = null;
  readonly pageSize: number = 10;
  readonly initialPage: number = 0;
  searchTerm: string = '';
  filteredUserStories: UserStory[] = [];
  selectedUserStory: UserStory | null = null;
  constructor(
    private userStoryService: UserStoryService,
    private route: ActivatedRoute
  ) {}

  /**
   * The `ngOnInit` lifecycle hook is called after the component's data-bound properties have been initialized.
   * This method is used to initialize the component's state and perform any necessary setup.
   *
   * @param {void} - No input arguments.
   * @returns {void} - No output data.
   *
   * This method subscribes to the `paramMap` of the `ActivatedRoute` to get the `projectId` from the route parameters.
   * It then calls the `getUserStories` method to fetch the user stories for the specified project.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
      // Check if the 'id' parameter is present.
    });
    this.getUserStories(this.initialPage, this.pageSize);
  }

  /**
   * The `getUserStories` method is responsible for fetching user stories for the specified project.
   *
   * @param {number} page - The page number to fetch user stories from. Defaults to 0.
   * @param {number} size - The number of user stories to fetch per page. Defaults to 10.
   *
   * @returns {void} - No output data. This method subscribes to the `getUserStories` API call from the `UserStoryService` and updates the `userStories` array with the fetched data.
   *
   * This method calls the `getUserStories` API endpoint from the `UserStoryService` with the specified `page` and `size` parameters. Upon receiving the response, it updates the `userStories` array with the fetched data and calls the `filterUserStories` method to filter the user stories based on the search term.
   */
  getUserStories(
    page: number = this.initialPage,
    size: number = this.pageSize
  ): void {
    if (this.projectId) {
      this.userStoryService.getUserStories(parseInt(this.projectId),page, size).subscribe((response) => {
        this.userStories = response.data.content;
        this.totalPage = response.data.totalPages;
        this.totalElements = response.data.totalElements;
        this.filterUserStories();
      });
    }
  }

  /**
   * The `openModal` method is responsible for opening the modal for creating a new user story.
   *
   * @returns {void} - No output data. This method sets the `isModalOpen` property to `true`, indicating that the modal should be displayed.
   *
   * This method is called when the user wants to create a new user story. It simply sets the `isModalOpen` property to `true`, which triggers the display of the modal. The modal is a separate component that is responsible for handling the creation of new user stories.
   */
  openModal(): void {
    this.isModalOpen = true;
  }

  /**
   * The `closeModal` method is responsible for closing the modal.
   *
   * @param {Event} [event] - An optional event object that can be passed to the method.
   * @returns {void} - No output data. This method sets the `isModalOpen` property to `false`, indicating that the modal should be closed.
   *
   * This method is called when the user wants to close the modal. It simply sets the `isModalOpen` property to `false`, which triggers the closing of the modal. The modal is a separate component that is responsible for handling the creation or editing of user stories.
   */
  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }

  /**
   * The `openUpdateModal` method is responsible for opening the modal for editing an existing user story.
   *
   * @param {UserStory} story - The user story object that needs to be edited.
   *
   * @returns {void} - No output data. This method sets the `isUpdateModalOpen` property to `true`, indicating that the modal should be displayed.
   *
   * This method is called when the user wants to edit an existing user story. It simply sets the `isUpdateModalOpen` property to `true`, which triggers the display of the modal. The modal is a separate component that is responsible for handling the editing of user stories. Additionally, it sets the `selectedUserStory` property to the provided `story` object, which contains the details of the user story that needs to be edited.
   */
  openUpdateModal(story: UserStory): void {
    this.selectedUserStory = story;
    this.isUpdateModalOpen = true;
  }

  /**
   * The `closeUpdateModal` method is responsible for closing the modal for editing an existing user story.
   *
   * @param {Event} [event] - An optional event object that can be passed to the method.
   * @returns {void} - No output data. This method sets the `isUpdateModalOpen` property to `false`, indicating that the modal should be closed.
   *
   * This method is called when the user wants to close the modal for editing an existing user story. It simply sets the `isUpdateModalOpen` property to `false`, which triggers the closing of the modal. The modal is a separate component that is responsible for handling the editing of user stories. Additionally, it sets the `selectedUserStory` property to `null`, which removes the selected user story from the component's state.
   */
  closeUpdateModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUpdateModalOpen = false;
    this.selectedUserStory = null;
  }

  /**
   * The `handleUserStoryCreated` method is responsible for handling the creation of a new user story.
   *
   * @param {UserStory} newUserStory - The new user story object that needs to be created.
   *
   * @returns {void} - No output data. This method adds the new user story to the `userStories` array, increments the `totalElements` property, closes the modal, filters the user stories based on the search term, and updates the status message and success message properties.
   *
   * This method is called when a new user story is successfully created. It simply adds the new user story to the `userStories` array, increments the `totalElements` property to reflect the new user story, closes the modal that was used to create the user story, filters the user stories based on the search term to reflect the new user story, and updates the status message and success message properties to inform the user that the user story was created successfully. The status message and success message properties are used to display a success message to the user and will automatically disappear after 3 seconds.
   */
  handleUserStoryCreated(newUserStory: UserStory): void {
    this.userStories.push(newUserStory);
    this.totalElements++;
    this.closeModal();
    this.filterUserStories();

    this.statusMessage = 'La historia de usuario se creó exitosamente';
    this.successMessage = true;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  /**
   * The `handleUserStoryUpdated` method is responsible for handling the update of an existing user story.
   *
   * @param {UserStory} updatedUserStory - The updated user story object that needs to be saved.
   *
   * @returns {void} - No output data. This method updates the selected user story in the `userStories` array, filters the user stories based on the search term, closes the modal for editing the user story, and updates the status message and success message properties.
   *
   * This method is called when an existing user story is successfully updated. It simply updates the selected user story in the `userStories` array with the provided `updatedUserStory` object, filters the user stories based on the search term to reflect the updated user story, closes the modal that was used to edit the user story, and updates the status message and success message properties to inform the user that the user story was updated successfully. The status message and success message properties are used to display a success message to the user and will automatically disappear after 3 seconds.
   */
  handleUserStoryUpdated(updatedUserStory: UserStory): void {
    const index = this.userStories.findIndex(
      (story) => story.id === updatedUserStory.id
    );
    if (index > -1) {
      this.userStories[index] = updatedUserStory;
      this.filterUserStories();
      this.closeUpdateModal();
      this.statusMessage = 'La historia de usuario se actualizó exitosamente';
      this.successMessage = true;
      setTimeout(() => {
        this.statusMessage = null;
      }, 3000);
    }
  }

  /**
   * The `handleError` method is responsible for handling errors that occur during the creation or editing of user stories.
   *
   * @param {any} error - The error object that contains information about the error that occurred.
   *
   * @returns {void} - No output data. This method sets the `statusMessage` and `successMessage` properties to inform the user about the error and automatically clears the status message after 3 seconds.
   *
   * This method is called when an error occurs during the creation or editing of a user story. It simply sets the `statusMessage` property to display an error message to the user and sets the `successMessage` property to `false` to indicate that the operation was not successful. The `statusMessage` and `successMessage` properties are used to display a success message to the user and will automatically disappear after 3 seconds.
   */
  handleError(error: any): void {
    this.closeModal();
    this.statusMessage = 'Error, intente más tarde';
    this.successMessage = false;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  /**
   * The `nextPage` method is responsible for navigating to the next page of user stories.
   *
   * @returns {void} - No output data. This method increments the `page` property by 1, indicating that the user wants to view the next page of user stories. It then calls the `getUserStories` method to fetch the user stories for the specified project and the new page number.
   *
   * This method is called when the user wants to view the next page of user stories. It simply increments the `page` property by 1, which triggers the fetching of the next page of user stories. The `getUserStories` method is responsible for fetching user stories for the specified project and the new page number. Upon receiving the response, it updates the `userStories` array with the fetched data and calls the `filterUserStories` method to filter the user stories based on the search term.
   */
  nextPage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.getUserStories(this.page - 1, this.pageSize);
    }
  }

  /**
   * The `backPage` method is responsible for navigating to the previous page of user stories.
   *
   * @returns {void} - No output data. This method decrements the `page` property by 1, indicating that the user wants to view the previous page of user stories. It then calls the `getUserStories` method to fetch the user stories for the specified project and the new page number.
   *
   * This method is called when the user wants to view the previous page of user stories. It simply decrements the `page` property by 1, which triggers the fetching of the previous page of user stories. The `getUserStories` method is responsible for fetching user stories for the specified project and the new page number. Upon receiving the response, it updates the `userStories` array with the fetched data and calls the `filterUserStories` method to filter the user stories based on the search term.
   */
  backPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getUserStories(this.page - 1, this.pageSize);
    }
  }

  /**
   * The `filterUserStories` method is responsible for filtering the user stories based on the search term.
   *
   * @param {void} - No input arguments.
   * @returns {void} - No output data. This method updates the `filteredUserStories` array with the filtered user stories based on the search term.
   *
   * This method is called when the user wants to search for specific user stories. It simply checks if the `searchTerm` property is not empty. If it's not empty, it filters the `userStories` array using the `filter` method and includes the user stories that have the search term in their title or description. The `toLowerCase` method is used to ensure case-insensitive matching. If the `searchTerm` property is empty, the `filteredUserStories` array is updated with a copy of the `userStories` array.
   */
  filterUserStories(): void {
    if (this.searchTerm) {
      this.filteredUserStories = this.userStories.filter(
        (story) =>
          story.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          story.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUserStories = [...this.userStories];
    }
  }

  /**
   * The `trackById` method is a built-in method provided by Angular's Change Detection mechanism.
   *
   * @param {number} index - The index of the item in the array.
   * @param {UserStory} item - The UserStory object that needs to be tracked.
   *
   * @returns {number} - The unique identifier of the UserStory object.
   *
   * This method is called by Angular's Change Detection mechanism to track changes in the `userStories` array. It simply returns the `id` property of the `UserStory` object, which is used as a unique identifier for the object. This method is used to ensure that Angular can efficiently detect changes in the array and update the UI accordingly.
   */
  trackById(index: number, item: UserStory): number {
    return item.id;
  }
}
