import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { NavComponent } from './nav/nav.component';
import { FilterComponent } from './filter/filter.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatExpansionModule } from "@angular/material";
import { PropertyCreateComponent } from './property-create/property-create.component';
import { AppRoutingModule } from "./app-routing.module";
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/interceptor'


@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent,
    NavComponent,
    FilterComponent,
    TicketListComponent,
    SideBarComponent,
    PropertyCreateComponent,
    OwnerCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
