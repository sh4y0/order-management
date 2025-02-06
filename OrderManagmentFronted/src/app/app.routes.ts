import { Routes } from '@angular/router';
import {OrderListComponent} from './components/order-list/order-list.component';
import {OrderFormComponent} from './components/order-form/order-form.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';

export const routes: Routes = [
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: 'orders/detail/:id', component: OrderDetailComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' }
];
