import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form_width = window.innerWidth - 290 +"px";

  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.form_width = window.innerWidth - 290 +"px";
  }



}
