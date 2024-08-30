import { Component } from '@angular/core';
import { UpdateProjectsComponent } from "../update-projects/update-projects.component";
import { CreateUserStoriesComponent } from "../../../user-stories/components/create-user-stories/create-user-stories.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-projects',
  standalone: true,
  imports: [UpdateProjectsComponent, CreateUserStoriesComponent,RouterLink],
  templateUrl: './details-projects.component.html',
  styleUrls: ['./details-projects.component.css'],
})
export class DetailsProjectsComponent {
  isModalOpen = false;
  isCreateStoryModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openCreateStoryModal() {
    this.isCreateStoryModalOpen = true;
  }

  closeCreateStoryModal() {
    this.isCreateStoryModalOpen = false;
  }
}
