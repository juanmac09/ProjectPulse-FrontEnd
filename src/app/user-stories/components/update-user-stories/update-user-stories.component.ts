import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateUserStoryService } from '../../services/update-user-story/update-user-story.service';
import { UserStory } from '../../interfaces/user-story';

@Component({
  selector: 'app-update-user-stories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user-stories.component.html',
  styleUrl: './update-user-stories.component.css',
})
export class UpdateUserStoriesComponent implements OnChanges {
  userStoryForm: FormGroup;
  @Input() userStoryUpdate: UserStory | null = null;
  @Output() userStoryUpdateEvent = new EventEmitter<any>();
  @Output() errorOccurred = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private userStoryService: UpdateUserStoryService
  ) {
    this.userStoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * ngOnChanges is an Angular Lifecycle Hook that is called every time an input property of a component changes.
   * It receives a SimpleChanges object as an argument, which contains a list of all the properties that have changed.
   *
   * In this component, we are specifically interested in the 'userStoryUpdate' input property.
   * If it changes and a valid 'userStoryUpdate' object is detected, we patch the form values with the new data.
   *
   * @param changes - An object containing a list of all the properties that have changed.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userStoryUpdate'] && this.userStoryUpdate) {
      // If the 'userStoryUpdate' input property has changed and a valid 'userStoryUpdate' object is detected,
      // we patch the form values with the new data.
      this.userStoryForm.patchValue({
        title: this.userStoryUpdate.title,
        description: this.userStoryUpdate.description,
      });
    }
  }

  /**
   * onSubmit: This method is called when the form is submitted.
   * It first checks if the form is invalid. If it is, it marks all form controls as touched and returns early.
   * If the form is valid, it retrieves the form data and formats it into a user story data object.
   * If a user story update object is detected, it sends a request to the server to update the user story using the user story service.
   * Upon successful response, it emits the updated user story data through the userStoryUpdateEvent event emitter.
   * If an error occurs during the request, it emits the error through the errorOccurred event emitter.
   * @param None
   * @return None
   * @throws None
   */
  onSubmit(): void {
    if (this.userStoryForm.invalid) {
      this.userStoryForm.markAllAsTouched();
      return;
    }
    const userStoryData = this.formatUserStoryData(this.userStoryForm.value);
    if (this.userStoryUpdate) {
      this.userStoryService
        .UpdateUserStory(this.userStoryUpdate.id, userStoryData)
        .subscribe({
          next: (response) => {
            this.userStoryUpdateEvent.emit(response.data);
          },
          error: (error) => {
            this.errorOccurred.emit(error);
          },
        });
    }
  }

  get title() {
    return this.userStoryForm.get('title');
  }

  get description() {
    return this.userStoryForm.get('description');
  }

  /**
   * formatUserStoryData: This function formats the input data into a user story data object.
   *
   * @param data - The input data containing the title and description of the user story.
   * @returns A user story data object containing the formatted title and description.
   */
  formatUserStoryData(data: any): { title: string; description: string } {
    return {
      title: data.title,
      description: data.description,
    };
  }
}
