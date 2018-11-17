import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Platforms {
  value: string;
  viewValue: string;
}

export interface InquiryType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {

  platforms: Platforms[] = [
    {value: 'airbnb-vj-0', viewValue: 'Airbnb - VJ'},
    {value: 'airbnb-owner-1', viewValue: 'Airbnb - Owner'},
    {value: 'vrbo-vj-2', viewValue: 'VRBO - VJ'},
    {value: 'vrbo-owner-3', viewValue: 'VRBO - Owner'},
    {value: 'homeaway-owner-4', viewValue: 'HomeAway - Owner'},
    {value: 'tripadvisor-vj-5', viewValue: 'TripAdvisor - VJ'},
    {value: 'tripadvisor-owner-6', viewValue: 'TripAdvisor - Owner'},
    {value: 'booking.com-vj-7', viewValue: 'Booking.com - VJ'},
    {value: 'booking.com-owner-8', viewValue: 'Booking.com - Owner'},
    {value: 'ownersite-owner-9', viewValue: "Owner's Site"},
    {value: 'other-vj-10', viewValue: 'Other - VJ'},
    {value: 'other-owner-11', viewValue: 'Owner - Other'},
    {value: 'offline-11', viewValue: 'Offline'}
  ];
  selectedPlatform: string;

  inquiryTypes: InquiryType[] = [
    {value: 'inquiry-0', viewValue: 'Inquiry'},
    {value: 'booking-request-1', viewValue: 'Booking Request'},
    {value: 'instant-booking-2', viewValue: 'Instant Booking'}
  ];
  selectedInquiryType: string;

  check_in = new Date();

  tickets: Ticket[] = [];
  ticket: Ticket;
  userIsAuthenticated = false;
  userId: string;
  private ticketsSub: Subscription;
  private authStatusSub: Subscription;
  user;

  myControl = new FormControl();
  otherControl = new FormControl();

  options1: string[] = ['One', 'Two', 'Three'];
  options2: string[] = ['Four', 'Five', 'Six'];

  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;




  constructor(public ticketService: TicketService, private userService: UserService) { }

  ticketId = '';
  dropdown = 'up';
  modal = false;
  enteredPlatformImage = '';


  ngOnInit() {

    this.filteredOptions1 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptions2 = this.otherControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );




    this.userService.getUser().then(name => {
      this.user = this.userService.userName
    });
    this.userService.getUserName();
    this.userId = this.userService.getUserId();
    this.ticketService.getTickets();
    this.ticketsSub = this.ticketService.getTicketUpdateListener()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
      });
    this.userIsAuthenticated = this.userService.getIsAuth()
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.userService.getUserId();
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }


  toggleNotes(ticketId){
    if (this.dropdown != ticketId) {
      this.dropdown = ticketId;
    }
    else {
      this.dropdown = 'up';
    }
  }



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

    this.ticketService.addTicket(form.value.platform, form.value.inquiry_type, form.value.guest_name, form.value.check_in, form.value.check_out, form.value.property, form.value.property_owner, this.enteredPlatformImage, 'Account Type', 'Unresolved', this.user['user'], this.user['user'])
    form.resetForm();
  }

  onDelete(ticketId: string){
    this.ticketService.deleteTicket(ticketId);
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
    this.ticketService.updateTicket(id, form.value.platform, form.value.inquiry_type, form.value.guest_name, form.value.check_in, form.value.check_out, form.value.property, form.value.property_owner, this.enteredPlatformImage, status, 'Account Type', 'User');

    this.close();
  }

  close(){
    this.modal = false;
  }

  ngOnDestroy() {
    this.ticketsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
