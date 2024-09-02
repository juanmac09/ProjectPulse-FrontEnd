import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateTiketsComponent } from '../../../tikets/components/create-tikets/create-tikets.component';
import { CreateUserStoryService } from '../../services/create-user-story/create-user-story.service';
import { CreateTicketService } from '../../../tikets/services/create-tickets/create-ticket.service';

@Component({
  selector: 'app-create-user-stories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user-stories.component.html',
  styleUrls: ['./create-user-stories.component.css'],
})
export class CreateUserStoriesComponent {
  userStoryForm: FormGroup;
  @Input() projectId: string = '';
  @Output() userStoryCreated = new EventEmitter<any>();
  @Output() errorOccurred = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userStoryService: CreateUserStoryService,
    private ticketService: CreateTicketService
  ) {
    this.userStoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get title() {
    return this.userStoryForm.get('title')!;
  }

  get description() {
    return this.userStoryForm.get('description')!;
  }

  /**
   * onSubmit: This method is triggered when the form is submitted.
   * It first checks if the form is invalid. If it is, it marks all fields as touched and returns early.
   * If the form is valid, it formats the user story data and emits it through the userStoryCreated event emitter.
   * It then calls the openTicketCreationDialog method to open a dialog for creating a ticket related to the user story.
   * @param {FormGroup} userStoryForm - The form group containing the user story data.
   */
  onSubmit(): void {
    if (this.userStoryForm.invalid) {
      this.userStoryForm.markAllAsTouched();
      return;
    }

    const userStoryData = this.formatDataUserStory(this.userStoryForm.value);

    this.openTicketCreationDialog(userStoryData);
  }

  /**
   * openTicketCreationDialog: This method opens a dialog for creating a ticket related to the user story.
   * @param {any} userStoryData - The data of the user story that will be used to create a ticket.
   * @returns {void} - This method does not return any value. It only opens a dialog and subscribes to its afterClosed event.
   */
  private openTicketCreationDialog(userStoryData: any): void {
    const dialogRef = this.dialog.open(CreateTiketsComponent, {
      width: '500px',
      data: { userStory: userStoryData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleTicketCreation(result, userStoryData);
      }
    });
  }

  /**
   * handleTicketCreation: This method handles the creation of a ticket related to a user story.
   * @param {any} ticketData - The data of the ticket that will be created.
   * @param {any} userStoryData - The data of the user story that will be used to create a ticket.
   * @returns {void} - This method does not return any value. It only creates a ticket and emits the ticket data through the userStoryCreated event emitter.
   */
  private handleTicketCreation(ticketData: any, userStoryData: any): void {
    this.userStoryService.createUserstory(userStoryData).subscribe({
      next: (response) => {
        const ticket = this.formatTicketData(response.data.id, ticketData);
        this.ticketService.createTicket(ticket).subscribe({
          next: (response) => this.userStoryCreated.emit(response.data),
          error: (error) => this.errorOccurred.emit(error),
        });
      },
      error: (error) => this.errorOccurred.emit(error),
    });
  }

  /**
   * formatDataUserStory: This method formats the user story data before it is sent to the server.
   * @param {any} data - The raw user story data containing the title, description, and project ID.
   * @returns {any} - The formatted user story data with the project ID wrapped in an object.
   */
  private formatDataUserStory(data: any): any {
    return {
      title: data.title,
      description: data.description,
      projectId: {
        id: this.projectId,
      },
    };
  }

  /**
   * formatTicketData: This method formats the ticket data before it is sent to the server.
   * @param {number} userStoryId - The ID of the user story that the ticket is related to.
   * @param {any} data - The raw ticket data containing the title, description, status, comment, and other ticket details.
   * @returns {any} - The formatted ticket data with the user story ID wrapped in an object.
   */
  private formatTicketData(userStoryId: number, data: any): any {
    return {
      title: data.title,
      description: data.description,
      status: data.status,
      comment: data.comment,
      userStory: {
        id: userStoryId,
      },
    };
  }
}
