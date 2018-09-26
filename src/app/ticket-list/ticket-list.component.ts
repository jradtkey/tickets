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
  ticket: Ticket;
  private ticketsSub: Subscription;


  constructor(public ticketService: TicketService) { }

  ticketId = '';
  dropdown = 'up';
  modal = false;
  enteredPlatformImage = '';

  ngOnInit() {
    this.ticketService.getTickets();
    this.ticketsSub = this.ticketService.getTicketUpdateListener()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
      });
  }

  toggleNotes(ticketId){
    if (this.dropdown != ticketId) {
      this.dropdown = ticketId;
    }
    else {
      this.dropdown = 'up';
    }
  }

  onDelete(ticketId: string){
    this.ticketService.deleteTicket(ticketId);
  }

  ngOnDestroy() {
    this.ticketsSub.unsubscribe();
  }

  onEdit(ticketId) {
    this.ticket = this.ticketService.getTicket(ticketId);
    this.modal = true;
  }

  onEditTicket(form, id, status) {
    if (form.value.platform == 'VRBO'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=17Rxa0hF9_5FcGsFTvTu0xGp72PBntj8x"
    }
    else if (form.value.platform == 'Airbnb'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=1g_qFKFiu0xHonp68pPevLlzuf8iMN7Ky"
    }
    else if (form.value.platform == 'Booking.com'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=1rER6gOj6cKfHqAIbQoryI-Av8RabD07s"
    }
    this.ticketService.updateTicket(id, form.value.platform, form.value.inquiry_type, form.value.guest_name, form.value.check_in, form.value.check_out, form.value.property, form.value.property_owner, this.enteredPlatformImage, status);
  }

  close(){
    this.modal = false;
  }

}
