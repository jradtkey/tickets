import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService){}

  ngOnInit() {
    this.userService.autoAuthUser();
  }

  form_width = window.innerWidth - 290 +"px";

  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.form_width = window.innerWidth - 290 +"px";
  }



}
