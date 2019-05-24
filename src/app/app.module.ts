// @angular imports
import { NgModule }			from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';
import { FormsModule }		from "@angular/forms";
import { HttpModule }		from '@angular/http';
import { AppRoutingModule } from './routes.module';
// component imports - declarations
import { AppComponent }  	from './app.component';
import { orderform } 		from './orderform.component';
import { menu }				from './menu.component';
import { summary }			from './summary.component';
import { allOrders }		from './ShowOrders.component';
import { dash }				from './dash.component';
// service imports - providers
import { Service } 			from './global.service';

@NgModule({
	imports:      [ 
		BrowserModule ,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	declarations: [ 
		AppComponent,
		orderform,
		menu,
		summary,
		allOrders,
		dash
	],
	providers:	[
		Service
	],
	bootstrap:    [ 
		AppComponent 
	]
})
export class AppModule { }
