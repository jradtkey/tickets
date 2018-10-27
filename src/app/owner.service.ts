import { Injectable } from '@angular/core';
import { Owner } from './owner.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient, private router: Router) { }

  private owners: Owner[] = [];
  private ownersUpdated = new Subject<Owner[]>();
  owner;
  ownerId = '';

  getOwners(){
    this.http.get<{message: string, owners: any}>('http://localhost:3000/api/owners')
      .pipe(map((ownerData) => {
        return ownerData.owners.map(owner => {
          return {
            id: owner._id,
            name: owner.name,
            email: owner.email,
            phone: owner.phone,
            accountType: owner.accountType,
            commission: owner.commission,
            contacts: owner.contacts,
            properties: owner.properties
          }
        })
      }))
      .subscribe(transformedOwners => {
        this.owners = transformedOwners;
        this.ownersUpdated.next([...this.owners]);
      })
  }

  getOwnerUpdateListener(){
    return this.ownersUpdated.asObservable();
  }

  async showOwner(id) {
    this.owner = await this.http.get('http://localhost:3000/api/owners/' + id).toPromise();
    this.owner = this.owner['owner']
    this.router.navigate(['/owner/'+id]);
  }


  createOwner(name: string, phone: string, email: string, accountType: string, commission: number){
      const owner: Owner = {
        id: null,
        name: name,
        phone: phone,
        email: email,
        accountType: accountType,
        commission: commission,
        contacts: [{}],
        properties: [{}],
        notes: [{}],
        createdAt: null
      }
      console.log("owner service", owner);

      this.http.post<{message: string, owner: any}>('http://localhost:3000/api/owners', owner)
        .subscribe((responseData) => {
          var id = responseData.owner._id;
          this.owner = responseData.owner
          this.router.navigate(['/owner/'+id]);
        })

    }


  updateOwnerContact(contactForm, id, contacts, properties, notes, createdAt){
    const owner: Owner = {
      id: id,
      name: contactForm.value.name,
      phone: contactForm.value.phone,
      email: contactForm.value.email,
      accountType: contactForm.value.accountType,
      commission: contactForm.value.commission,
      contacts: contacts,
      properties: properties,
      notes: notes,
      createdAt: createdAt
    }
    this.http.put('http://localhost:3000/api/owners/' + id, owner)
      .subscribe((response => {
        console.log("response", response);
        this.owner = response;
        // const updatedTickets = [...this.tickets];
        // const oldTicketIndex = updatedTickets.findIndex(t => t.id === ticket.id);
        // updatedTickets[oldTicketIndex] = ticket;
        // this.tickets = updatedTickets;
        // this.ticketsUpdated.next([...this.tickets]);
      }))
  }


}
