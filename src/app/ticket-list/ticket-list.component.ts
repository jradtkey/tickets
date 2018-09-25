import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {

  tickets: Ticket[] = [];
  private ticketsSub: Subscription;

  constructor(public ticketService: TicketService) { }

  ticketId = '';
  dropdown = 'up';

  ngOnInit() {
    console.log("here")
    this.ticketService.getTickets();
    this.ticketsSub = this.ticketService.getTicketUpdateListener()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
      });
  }

  toggleNotes(ticketId){
    if (this.dropdown != ticketId) {
      this.dropdown = ticketId;
      console.log('down')
    }
    else {
      this.dropdown = 'up'
      console.log('up')
    }
  }

  onDelete(ticketId: string){
    this.ticketService.deleteTicket(ticketId);
  }

  ngOnDestroy() {
    this.ticketsSub.unsubscribe();
  }

}
