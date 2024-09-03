import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DetailsTicketComponent } from '../details-ticket/details-ticket.component';
import { CreateTiketsComponent } from '../create-tikets/create-tikets.component';

import { Ticket } from '../../interfaces/ticket';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketService } from '../../services/create-tickets/create-ticket.service';
import { StatusMessageComponent } from '../../../helpers/messages/status-message/status-message.component';

@Component({
  selector: 'app-tikets',
  standalone: true,
  imports: [
    NgClass,
    DetailsTicketComponent,
    CreateTiketsComponent,
    FormsModule,
    StatusMessageComponent,
  ],
  templateUrl: './tikets.component.html',
  styleUrl: './tikets.component.css',
})
export class TiketsComponent implements OnInit {
  page: number = 1;
  totalPage: number = 0;
  totalElements: number = 0;
  readonly pageSize: number = 5;
  readonly initialPage: number = 0;
  searchTerm: string = '';
  filteredTickets: Ticket[] = [];
  userStoryId: string | null = '';
  tickets: Ticket[] = [];
  statusMessage: string | null = null;
  successMessage: boolean = true;
  isTicketDetailsModalOpen = false;
  selectedTicket: any = null;

  constructor(
    private ticketService: TicketsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ticketCreateService: CreateTicketService
  ) {}

  ngOnInit(): void {
    this.loadUserStoryId();
    this.getTickets(this.initialPage, this.pageSize);
  }

  /**
   * Load the user story ID from the route parameters.
   * @returns {void}
   */
  private loadUserStoryId(): void {
    this.route.paramMap.subscribe((params) => {
      this.userStoryId = params.get('id');
    });
  }

  /**
   * Fetch tickets based on the current page and page size.
   * @param {number} page - The page number to fetch.
   * @param {number} size - The number of tickets per page.
   * @returns {void}
   */
  private getTickets(
    page: number = this.initialPage,
    size: number = this.pageSize
  ): void {
    if (this.userStoryId) {
      this.ticketService
        .getTickets(parseInt(this.userStoryId), page, size)
        .subscribe((response) => {
          this.tickets = response.data.content;
          this.totalPage = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.filterTickets();
        });
    }
  }

  /**
   * Open a modal to display ticket details.
   * @param {Ticket} ticket - The ticket to display in the modal.
   * @returns {void}
   */
  openTicketDetailsModal(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isTicketDetailsModalOpen = true;
  }

  /**
   * Close the ticket details modal.
   * @returns {void}
   */
  closeTicketDetailsModal(): void {
    this.isTicketDetailsModalOpen = false;
    this.selectedTicket = null;
  }

  /**
   * Open a dialog for creating a new ticket.
   * @returns {void}
   */
  openCreateTicketModal(): void {
    this.openTicketCreationDialog();
  }

  /**
   * Navigate to the next page of tickets.
   * @returns {void}
   */
  nextPage(): void {
    if (this.page < this.totalPage) {
      this.page++;
      this.getTickets(this.page - 1, this.pageSize);
    }
  }

  /**
   * Navigate to the previous page of tickets.
   * @returns {void}
   */
  backPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getTickets(this.page - 1, this.pageSize);
    }
  }

  /**
   * Filter tickets based on the search term.
   * @returns {void}
   */
  filterTickets(): void {
    if (this.searchTerm) {
      this.filteredTickets = this.tickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          ticket.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTickets = [...this.tickets];
    }
  }

  /**
   * Track tickets by their unique ID.
   * @param {number} index - The index of the ticket in the array.
   * @param {Ticket} item - The ticket object.
   * @returns {number} - The unique ID of the ticket.
   */
  trackById(index: number, item: Ticket): number {
    return item.id;
  }

  /**
   * Open a dialog for creating a new ticket and handle the result.
   * @returns {void}
   */
  private openTicketCreationDialog(): void {
    const dialogRef = this.dialog.open(CreateTiketsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.userStoryId) {
        this.createTicket(result);
      }
    });
  }

  /**
   * Create a new ticket with the provided data.
   * @param {any} result - The data from the create ticket dialog.
   * @returns {void}
   */
  private createTicket(result: any): void {
    if(this.userStoryId) {
      this.ticketCreateService
      .createTicket(
        this.formatTicketData(parseInt(this.userStoryId, 10), result)
      )
      .subscribe({
        next: (response) => {
          this.handleTicketCreate(response.data);
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }

  /**
   * Format ticket data for submission to the server.
   * @param {number} userStoryId - The ID of the user story associated with the ticket.
   * @param {any} data - The ticket data from the dialog.
   * @returns {any} - The formatted ticket data.
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

  /**
   * Handle the successful creation of a new ticket.
   * @param {Ticket} newTicket - The newly created ticket.
   * @returns {void}
   */
  private handleTicketCreate(newTicket: Ticket): void {
    this.tickets.push(newTicket);
    this.totalElements++;
    this.filterTickets();
    this.clearStatusMessageAfterDelay();
  }

  /**
   * Clear the status message after a delay.
   * @returns {void}
   */
  private clearStatusMessageAfterDelay(): void {
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000);
  }

  /**
   * Handle errors that occur during ticket creation or editing.
   * @param {any} error - The error object containing error details.
   * @returns {void}
   */
  private handleError(error: any): void {
    this.statusMessage = 'Error, intente más tarde';
    this.successMessage = false;
    this.clearStatusMessageAfterDelay();
  }
}
