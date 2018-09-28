import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  constructor(public ticketService: TicketService) { }

  ngOnInit() {
  }

  enteredPlatformImage = '';



  onCreateTicket(form: NgForm) {

    if (form.invalid){
      form.resetForm();
      return;
    }

    if (form.value.platform == 'VRBO'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=17Rxa0hF9_5FcGsFTvTu0xGp72PBntj8x"
    }
    else if (form.value.platform == 'Airbnb'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=1g_qFKFiu0xHonp68pPevLlzuf8iMN7Ky"
    }
    else if (form.value.platform == 'Booking.com'){
      this.enteredPlatformImage = "https://drive.google.com/thumbnail?id=1rER6gOj6cKfHqAIbQoryI-Av8RabD07s"
    }

    this.ticketService.addTicket(form.value.platform, form.value.inquiry_type, form.value.guest_name, form.value.check_in, form.value.check_out, form.value.property, form.value.property_owner, this.enteredPlatformImage, 'Account Type', 'Unresolved', 'User')
    form.resetForm();
  }

}
