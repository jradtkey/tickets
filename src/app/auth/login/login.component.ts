import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  login = true;
  match = true;

  onSubmit(form:NgForm){
    console.log(form.value)
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
