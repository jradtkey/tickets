import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  private tickets: Ticket[] = [];
  private ticketsUpdated = new Subject<Ticket[]>();

  getTickets(){
    return [...this.tickets];
  }

  getTicketUpdateListener(){
    return this.ticketsUpdated.asObservable();
  }

  addTicket(platform: string, inquiryType: string, firstName: string, lastName: string, checkIn: string, checkOut: string, property: string, propertyOwner: string, platformImage: string, status: string){

    const ticket: Ticket = {
      platform: platform,
      inquiryType: inquiryType,
      firstName: firstName,
      lastName: lastName,
      checkIn: checkIn,
      checkOut: checkOut,
      property: property,
      propertyOwner: propertyOwner,
      platformImage: platformImage,
      status: status
    };

    this.tickets.push(ticket);
    this.ticketsUpdated.next([...this.tickets])
  }
}
