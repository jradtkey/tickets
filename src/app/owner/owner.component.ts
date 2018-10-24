import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {

  constructor(public ownerService: OwnerService) { }

  owner = '';
  dropdown = [];
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

  ngOnInit() {
    this.owner = this.ownerService.owner;
  }

  onEdit(){
    this.modal = true;
  }

  close(){
    this.modal = false;
  }

  goToProperty(propId){
    console.log(propId)
    if (this.dropdown.includes(propId)){
      this.dropdown.splice(this.dropdown.indexOf(propId), 1)
    }
    else {
      this.dropdown.push(propId)
    }


    console.log(this.dropdown)
  }

  ngOnDestroy(){
  }

}
