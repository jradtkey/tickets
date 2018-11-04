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
  private ownerUpdated = new Subject<Owner[]>();
  owner;
  ownerId = '';
  propertyId = '';

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

  getOwnersUpdateListener(){
    return this.ownersUpdated.asObservable();
  }

  getOwnerUpdateListener(){
    return this.ownerUpdated.asObservable();
  }

  async showOwner(id) {
    this.owner = await this.http.get('http://localhost:3000/api/owners/' + id).toPromise();
    this.owner = this.owner['owner']
    this.router.navigate(['/owner/'+id]);
  }

  async getOwner(id) {
    this.owner = await this.http.get('http://localhost:3000/api/owners/' + id).toPromise();
    this.owner = this.owner['owner']
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
        this.ownerUpdated.next(this.owner);
      }))
  }

  addContact(form, id){
    var contact = {
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email
    }
    this.owner.contacts.push(contact)
    const owner: Owner = {
      id: id,
      name: this.owner.name,
      phone: this.owner.phone,
      email: this.owner.email,
      accountType: this.owner.accountType,
      commission: this.owner.commission,
      contacts: this.owner.contacts,
      properties: this.owner.properties,
      notes: this.owner.notes,
      createdAt: this.owner.createdAt
    }
    this.http.put('http://localhost:3000/api/owners/' + id, owner)
      .subscribe((response => {
        console.log("response", response);
        this.owner = response;
        this.ownerUpdated.next(this.owner);
      }))
  }

  addProperty(form, id){
    const property = {
          title: form.value.title,
          addressStreet: form.value.street,
          addressCity: form.value.city,
          addressState: form.value.state,
          addressZip: form.value.zip_code,
          status: form.value.status,
          owner_airbnb_link: form.value.owner_airbnb_link,
          owner_booking_link: form.value.owner_booking_link,
          owner_tripAdvisor_link: form.value.owner_tripAdvisor_link,
          owner_vrboHomeAway_link: form.value.owner_vrboHomeAway_link,
          owner_other_links: this.owner.owner_other_links,
          vj_airbnb_link: form.value.vj_airbnb_link,
          vj_booking_link: form.value.vj_booking_link,
          vj_tripAdvisor_link: form.value.vj_tripAdvisor_link,
          vj_vrboHomeAway_link: form.value.vj_vrboHomeAway_link,
          vj_other_links: this.owner.vj_other_links,
          createdAt: null
    }
    this.owner.properties.push(property);
    const owner: Owner = {
      id: id,
      name: this.owner.name,
      phone: this.owner.phone,
      email: this.owner.email,
      accountType: this.owner.accountType,
      commission: this.owner.commission,
      contacts: this.owner.contacts,
      properties: this.owner.properties,
      notes: this.owner.notes,
      createdAt: null
    }
    this.http.put('http://localhost:3000/api/owners/' + id, owner)
      .subscribe((response => {
        console.log("response", response);
        this.ownerUpdated.next(this.owner);
      }))
  }

  editProperty(form, id) {
    console.log(this.owner)
    var properties = this.owner.properties
    var oldProperty;
    for (let key of this.owner.properties) {
      if (key._id == id) {
        oldProperty = key;
      }
    }
    const property = {
      _id: oldProperty._id,
      title: form.value.title,
      addressStreet: form.value.street,
      addressCity: form.value.city,
      addressState: form.value.state,
      addressZip: form.value.zip_code,
      status: form.value.status,
      owner_airbnb_link: form.value.owner_airbnb_link,
      owner_booking_link: form.value.owner_booking_link,
      owner_tripAdvisor_link: form.value.owner_tripAdvisor_link,
      owner_vrboHomeAway_link: form.value.owner_vrboHomeAway_link,
      owner_other_links: oldProperty.owner_other_links,
      vj_airbnb_link: form.value.vj_airbnb_link,
      vj_booking_link: form.value.vj_booking_link,
      vj_tripAdvisor_link: form.value.vj_tripAdvisor_link,
      vj_vrboHomeAway_link: form.value.vj_vrboHomeAway_link,
      vj_other_links: oldProperty.vj_other_links,
      createdAt: oldProperty.createdAt
    }
    const oldPropertyIndex = properties.findIndex(p => p._id === property._id);
    properties[oldPropertyIndex] = property;
    this.owner.properties = properties;
    const owner: Owner = {
      id: this.owner._id,
      name: this.owner.name,
      phone: this.owner.phone,
      email: this.owner.email,
      accountType: this.owner.accountType,
      commission: this.owner.commission,
      contacts: this.owner.contacts,
      properties: this.owner.properties,
      notes: this.owner.notes,
      createdAt: null
    }
    this.http.put('http://localhost:3000/api/owners/' + this.owner._id, owner)
      .subscribe((response => {
        console.log("response", response);
        this.owner = response;
        this.ownerUpdated.next(this.owner);
      }))
  }

  deleteOwner(ownerId: string) {
    this.http.delete('http://localhost:3000/api/owners/' + ownerId)
      .subscribe(() => {
        this.router.navigate(['/Owners']);
      });
  }


}
