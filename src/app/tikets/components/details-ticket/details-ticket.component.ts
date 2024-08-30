import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-ticket',
  standalone: true,
  imports: [],
  templateUrl: './details-ticket.component.html',
  styleUrl: './details-ticket.component.css'
})
export class DetailsTicketComponent {
  
  @Input() ticket: any;

  goBack() {
    // Implement navigation logic here
  }

  editTicket() {
    // Implement edit ticket logic here
  }

}
