import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './common-component/index/index.component';
import {TicketListComponent} from './ticket/component/ticket-list/ticket-list.component';
import {TicketCreateComponent} from './ticket/component/ticket-create/ticket-create.component';
import {TicketEditComponent} from './ticket/component/ticket-edit/ticket-edit.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'ticket',
    component: TicketListComponent
  },
  {
    path: 'ticket/create',
    component: TicketCreateComponent
  },
  {
    path: 'ticket/edit/:id',
    component: TicketEditComponent
  }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
