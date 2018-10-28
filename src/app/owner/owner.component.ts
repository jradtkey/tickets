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
  constructor(public ownerService: OwnerService, private route: ActivatedRoute, private router: Router) {

  //   this.navigationSubscription = this.router.events.subscribe((e: any) => {
  //    // If it is a NavigationEnd event re-initalise the component
  //    console.log(NavigationEnd)
  //   //  if (e instanceof NavigationEnd) {
  //   //    this.initialiseOwner();
  //   //  }
  //  });

  }

  initialiseOwner() {
    // Set default values and re-fetch any data you need.
  }

  owner: Owner;
  // private ownerSub: Subscription;
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

  ngOnDestroy() {
    // this.ownerSub.unsubscribe();
  }

}
