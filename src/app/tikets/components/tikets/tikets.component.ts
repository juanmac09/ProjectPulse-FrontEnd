import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DetailsTicketComponent } from "../details-ticket/details-ticket.component";
import { CreateTiketsComponent } from "../create-tikets/create-tikets.component";

@Component({
  selector: 'app-tikets',
  standalone: true,
  imports: [NgClass, DetailsTicketComponent, CreateTiketsComponent],
  templateUrl: './tikets.component.html',
  styleUrl: './tikets.component.css'
})
export class TiketsComponent {
  tickets = [
    // Aquí podrías tener una lista de tickets con propiedades como id, title, description, status, etc.
    { id: 1, title: 'Título del Ticket 1', description: 'Descripción breve del ticket 1.', status: 'Activo' },
    { id: 2, title: 'Título del Ticket 2', description: 'Descripción breve del ticket 2.', status: 'En Proceso' },
    { id: 3, title: 'Título del Ticket 3', description: 'Descripción breve del ticket 3.', status: 'Finalizado' }
  ];
  
  isTicketDetailsModalOpen = false;
  selectedTicket: any = null;

  openTicketDetailsModal(ticket: any) {
    this.selectedTicket = ticket;
    this.isTicketDetailsModalOpen = true;
  }

  closeTicketDetailsModal() {
    this.isTicketDetailsModalOpen = false;
    this.selectedTicket = null;
  }
  isCreateTicketModalOpen = false;
  

  openCreateTicketModal() {
    this.isCreateTicketModalOpen = true;
  }

  closeCreateTicketModal() {
    this.isCreateTicketModalOpen = false;
  }
}
