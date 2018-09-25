import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketCreateComponent } from "./ticket-create/ticket-create.component";
import { PropertyCreateComponent } from "./property-create/property-create.component";

const routes: Routes =[
  { path: '', component: TicketListComponent},
  { path: 'createProperty', component: PropertyCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
