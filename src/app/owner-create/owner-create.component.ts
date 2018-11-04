import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Owner } from '../owner.model';
import { OwnerService } from '../owner.service';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit, OnDestroy {

  owners: Owner[] = [];
  owner: Owner;
  private ownersSub: Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  private modal = false;

  constructor(public ownerService: OwnerService, private userService: UserService) { }

  ngOnInit() {
    this.ownerService.getOwners();
    this.ownersSub = this.ownerService.getOwnersUpdateListener()
      .subscribe((owners: Owner[]) => {
        this.owners = owners;
      });
      this.userIsAuthenticated = this.userService.getIsAuth()
      this.authStatusSub = this.userService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
  }

  openCreateOwner(){
    if (this.modal == false) {
      this.modal = true;
    }
  }

  createOwner(form: NgForm){
    this.ownerService.createOwner(form.value.name, form.value.phone, form.value.email, form.value.accountType, form.value.commission);
  }

  close(){
    this.modal = false;
  }

  showOwner(id){
    this.ownerService.showOwner(id);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
