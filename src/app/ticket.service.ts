import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  private tickets: Ticket[] = [];
  private ticketsUpdated = new Subject<Ticket[]>();

  getTickets(){
    this.http
      .get<{message: string, tickets: any}>(
        'http://localhost:3000/api/tickets'
      )
      .pipe(map((ticketData) => {
        return ticketData.tickets.map(ticket => {
          return {
            platform: ticket.platform,
            inquiryType: ticket.inquiryType,
            guestName: ticket.guestName,
            checkIn: ticket.checkIn,
            checkOut: ticket.checkOut,
            property: ticket.property,
            propertyOwner: ticket.propertyOwner,
            platformImage: ticket.platformImage,
            accountType: ticket.accountType,
            assignedTo: ticket.assignedTo,
            status: ticket.status,
            id: ticket._id
          }
        })
      }))
      .subscribe(transformedTickets => {
        this.tickets = transformedTickets;
        this.ticketsUpdated.next([...this.tickets]);
      })
  }

  getTicketUpdateListener(){
    return this.ticketsUpdated.asObservable();
  }

  getTicket(id: string) {
    return {...this.tickets.find(t => t.id === id)};
  }

  addTicket(platform: string, inquiryType: string, guestName: string, checkIn: string, checkOut: string, property: string, propertyOwner: string, platformImage: string, accountType: string, status: string, assignedTo: string){

    const ticket: Ticket = {
      id: null,
      platform: platform,
      inquiryType: inquiryType,
      guestName: guestName,
      checkIn: checkIn,
      checkOut: checkOut,
      property: property,
      propertyOwner: propertyOwner,
      platformImage: platformImage,
      accountType: accountType,
      assignedTo: assignedTo,
      status: status
    };
    this.http.post<{message: string, ticketId: string}>('http://localhost:3000/api/tickets', ticket)
      .subscribe((responseData) => {
        const ticketId = responseData.ticketId;
        ticket.id = ticketId;
        this.tickets.push(ticket);
        this.ticketsUpdated.next([...this.tickets])
      });
  }

  updateTicket(id: string, platform: string, inquiryType: string, guestName: string, checkIn: string, checkOut: string, property: string, propertyOwner: string, platformImage: string, status: string, accountType: string, assignedTo: string) {

    const ticket: Ticket = {
      id: id,
      platform: platform,
      inquiryType: inquiryType,
      guestName: guestName,
      checkIn: checkIn,
      checkOut: checkOut,
      property: property,
      propertyOwner: propertyOwner,
      platformImage: platformImage,
      accountType: accountType,
      assignedTo: assignedTo,
      status: status
    };
    this.http.put('http://localhost:3000/api/tickets/' + id, ticket)
      .subscribe((response => {
        const updatedTickets = [...this.tickets];
        const oldTicketIndex = updatedTickets.findIndex(t => t.id === ticket.id);
        updatedTickets[oldTicketIndex] = ticket;
        this.tickets = updatedTickets;
        this.ticketsUpdated.next([...this.tickets]);
      }))
  }

  deleteTicket(ticketId: string) {
    this.http.delete('http://localhost:3000/api/tickets/' + ticketId)
      .subscribe(() => {
        const updatedTickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        this.tickets = updatedTickets;
        this.ticketsUpdated.next([...this.tickets]);
      });
  }

}
