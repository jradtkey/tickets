import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {

  constructor(public ownerService: OwnerService) { }

  owner: Owner;
  dropdown = 0;
  properties = [
    {
      id: 1412,
      name: 'Cottage'
    },
    {
      id: 1513,
      name: 'Bungalow'
    }
  ]
  modal = false;
  modalType = '';

  ngOnInit() {
    this.owner = this.ownerService.owner;
  }

  openModal(type){
    this.modalType = type;
    this.modal = true;
  }

  close(){
    this.modal = false;
  }

  goToProperty(propId){
    if(this.dropdown !== 1328) {
      this.dropdown = 1328;
    }
    else {
      this.dropdown = 0;
    }
  }

  editContact(contactForm, id) {
    console.log(contactForm);
    console.log(id)
    this.ownerService.updateOwnerContact(contactForm, id, this.owner.contacts, this.owner.properties, this.owner.notes, this.owner.createdAt);
  }

  ngOnDestroy(){
  }

}
