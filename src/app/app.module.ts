import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { NavComponent } from './nav/nav.component';
import { FilterComponent } from './filter/filter.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatExpansionModule } from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent,
    NavComponent,
    FilterComponent,
    TicketListComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
