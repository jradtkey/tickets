import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketCreateComponent } from "./ticket-create/ticket-create.component";
import { PropertyCreateComponent } from "./property-create/property-create.component";
import { OwnerCreateComponent } from "./owner-create/owner-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { OwnerComponent } from "./owner/owner.component";

const routes: Routes =[
  { path: 'tickets', component: TicketListComponent},
  { path: 'createProperty', component: PropertyCreateComponent},
  { path: 'Owners', component: OwnerCreateComponent },
  { path: 'owner/:id', component: OwnerComponent, runGuardsAndResolvers: 'always'},
  { path: '', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
