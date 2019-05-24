/*This is a new module.
  This module contains the table of 
  endpoints and the components they map too
  */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dash } from './dash.component';
import { menu } from './menu.component';
import { orderform} from './orderform.component';
import { summary } from './summary.component';
import { allOrders } from './ShowOrders.component';
//Import application components

const routes: Routes = [ 
    { path: '', redirectTo: '/dash', pathMatch: 'full'},
    { path: 'dash', component: dash },
    { path: 'menu', component: menu},
    { path: 'order', component: orderform },
    { path: 'summary', component: summary},
    { path: 'allOrders', component: allOrders }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
