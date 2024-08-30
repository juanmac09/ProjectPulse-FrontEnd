import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreateUserStoriesComponent } from '../create-user-stories/create-user-stories.component';
import { UpdateUserStoriesComponent } from "../update-user-stories/update-user-stories.component";

@Component({
  selector: 'app-user-stories',
  standalone: true,
  imports: [RouterLink, CreateUserStoriesComponent, UpdateUserStoriesComponent],
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.css']
})
export class UserStoriesComponent {
  isCreateStoryModalOpen = false;

  openCreateStoryModal() {
    this.isCreateStoryModalOpen = true;
  }

  closeCreateStoryModal() {
    this.isCreateStoryModalOpen = false;
  }

  isUpdateStoryModalOpen = false;

  openUpdateStoryModal() {
    this.isUpdateStoryModalOpen = true;
  }

  closeUpdateStoryModal() {
    this.isUpdateStoryModalOpen = false;
  }
}
