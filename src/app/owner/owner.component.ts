import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {
  navigationSubscription;
  constructor(public ownerService: OwnerService, private route: ActivatedRoute, private router: Router) {}

  owner: Owner;
  // private ownerSub: Subscription;
  dropdown = 0;
  modal = false;
  modalType = '';
  id = '';



  ngOnInit() {
    if(this.ownerService.owner == undefined){
      this.route.params.subscribe(params => {
        console.log("params", params) //log the entire params object
        console.log("params - id", params['id'])
        var id = params['id'] //log the value of id
        console.log(id)
        this.ownerService.getOwner(id).then(owner => this.owner = this.ownerService.owner);
      });
    }
    else {this.owner = this.ownerService.owner}
  }

  openModal(type, id){
    this.id = id;
    this.modalType = type;
    this.modal = true;
    console.log(id)
    console.log(type)
  }

  close(){
    this.modal = false;
    this.id = '';
    this.modalType = '';
  }

  goToProperty(propId){
    if(this.dropdown !== propId) {
      this.dropdown = propId;
    }
    else {
      this.dropdown = 0;
    }
  }

  editContact(contactForm, id) {
    console.log(contactForm);
    console.log(id)
    this.ownerService.updateOwnerContact(contactForm, id, this.owner.contacts, this.owner.properties, this.owner.notes, this.owner.createdAt);
    this.close();
  }

  addProperty(addPropertyForm, id) {
    console.log("owner id:", id);
    console.log("form:", addPropertyForm);
    this.ownerService.addProperty(addPropertyForm, id);
    this.close();
  }

  editProperty(form, id){
    console.log(form)
    console.log(id)
    this.ownerService.editProperty(form, id);
  }

  deleteOwner(id){
    alert("Are you sure you want to delete this owner?")
    this.ownerService.deleteOwner(id);
  }

  ngOnDestroy() {
  // this.ownerSub.unsubscribe();
  }

}
