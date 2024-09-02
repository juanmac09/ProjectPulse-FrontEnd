import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../../http/request-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {

  private endPoint: string = '/ticket/create';
  constructor(private httpService:RequestHttpService) { }


  /**
   * @description This method creates a new ticket by sending a POST request to the specified endpoint with the provided ticket data.
   * @param {any} ticket - The ticket data to be created.
   * @returns {Observable<any>} - An observable that emits the response from the server after creating the ticket.
   */
  createTicket(ticket:any):Observable<any>{
    return this.httpService.postData(this.endPoint, ticket);
  }
}
