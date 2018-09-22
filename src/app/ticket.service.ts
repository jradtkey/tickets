import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  private tickets: Ticket[] = [];
  private ticketsUpdated = new Subject<Ticket[]>();

  getTickets(){
    this.http.get<{message: string, tickets: Ticket[]}>('http://localhost:3000/api/tickets')
      .subscribe((ticketData) => {
        this.tickets = ticketData.tickets;
        this.ticketsUpdated.next([...this.tickets]);
      })
  }

  getTicketUpdateListener(){
    return this.ticketsUpdated.asObservable();
  }

  addTicket(platform: string, inquiryType: string, firstName: string, lastName: string, checkIn: string, checkOut: string, property: string, propertyOwner: string, platformImage: string, status: string){

    const ticket: Ticket = {
      id: null,
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
    this.http.post<{message: string}>('http://localhost:3000/api/tickets', ticket)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.tickets.push(ticket);
        this.ticketsUpdated.next([...this.tickets])
      });

  }
}
