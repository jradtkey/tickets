import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Owner } from '../owner.model';
import { OwnerService } from '../owner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {

  owners: Owner[] = [];
  owner: Owner;
  private ownersSub: Subscription;


  constructor(public ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getOwners();
    this.ownersSub = this.ownerService.getOwnerUpdateListener()
      .subscribe((owners: Owner[]) => {
        this.owners = owners;
        console.log(this.owners)
      });
  }

  createOwner(){
    console.log("owner created component")
    this.ownerService.createOwner();
  }

}
