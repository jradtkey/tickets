import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  user: User;
  private usersSub: Subscription;


  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  login = true;
  match = true;

  userLogin(form:NgForm){
    this.userService.login(form.value.email, form.value.password);
    form.resetForm();
  }

  onCreateUser(form: NgForm) {
    if (form.invalid) {
      return
    }
    if (form.value.password != form.value.confirm_password) {
      this.match = false;
      return
    }
    else {
      this.userService.createUser(form.value.name, form.value.email, form.value.password);
    }
    form.resetForm();
  }

  switch(){

    if (this.login==true) {
      this.login = false;
    }
    else {
      this.login = true;
    }
  }

}
