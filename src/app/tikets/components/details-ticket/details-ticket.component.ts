import { Component, Input } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';

@Component({
  selector: 'app-details-ticket',
  standalone: true,
  imports: [],
  templateUrl: './details-ticket.component.html',
  styleUrl: './details-ticket.component.css',
})
export class DetailsTicketComponent {
  @Input() ticket: Ticket = {
    id: 22,
    title: 'asdasdasd',
    description: 'asdasdas',
    status: 'Progress',
    comment: 'asdasdasdas',
  };

  goBack() {
    // Implement navigation logic here
  }

  editTicket() {
    // Implement edit ticket logic here
  }
}
