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

  dropdown = 1;

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
    this.ticketsSub = this.ticketService.getTicketUpdateListener()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
      });
  }

  toggleNotes(){
    if (this.dropdown == 1) {
      this.dropdown = 2;
    }
    else {
      this.dropdown = 1;
    }
  }

  ngOnDestroy() {
    this.ticketsSub.unsubscribe();
  }

}
