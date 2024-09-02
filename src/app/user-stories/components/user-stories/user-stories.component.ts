import { Component } from '@angular/core';
import { CreateUserStoriesComponent } from '../create-user-stories/create-user-stories.component';
import { UpdateUserStoriesComponent } from '../update-user-stories/update-user-stories.component'; // Asegúrate de importar el componente de actualización
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserStoryService } from '../../services/user-story/user-story.service';
import { FormsModule } from '@angular/forms';
import { StatusMessageComponent } from "../../../helpers/messages/status-message/status-message.component";

interface UserStory {
  id: number;
  title: string;
  description: string;
  projectNameAndDescription: {
    id: number;
    name: string;
    description: string;
  };
}

@Component({
  selector: 'app-user-stories',
  standalone: true,
  imports: [CreateUserStoriesComponent, UpdateUserStoriesComponent, RouterLink, FormsModule, StatusMessageComponent],
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

  constructor(private userStoryService: UserStoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
      // Check if the 'id' parameter is present.
    });
    this.getUserStories(this.initialPage, this.pageSize);
  }

  getUserStories(page: number, size: number): void {
    this.userStoryService.getUserStories(page, size).subscribe((response) => {
      this.userStories = response.data.content;
      this.totalPage = response.data.totalPages;
      this.totalElements = response.data.totalElements;
      this.filterUserStories();
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isModalOpen = false;
  }

  openUpdateModal(story: UserStory): void {
    this.selectedUserStory = story;
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUpdateModalOpen = false;
  }

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

  handleUserStoryUpdated(updatedUserStory: UserStory): void {
    const index = this.userStories.findIndex(story => story.id === updatedUserStory.id);
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

  handleError(error: any): void {
    this.closeModal();
    this.statusMessage = 'Error, intente más tarde';
    this.successMessage = false;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  nextPage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.getUserStories(this.page - 1, this.pageSize);
    }
  }

  backPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getUserStories(this.page - 1, this.pageSize);
    }
  }

  filterUserStories(): void {
    if (this.searchTerm) {
      this.filteredUserStories = this.userStories.filter(
        (story) =>
          story.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          story.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUserStories = [...this.userStories];
    }
  }

  trackById(index: number, item: UserStory): number {
    return item.id;
  }
}
