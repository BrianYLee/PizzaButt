import { Component } from '@angular/core';
//import { orderform } from './orderform.component';
@Component({
	selector: 'my-app',
	template: `
		<router-outlet></router-outlet>
	`,
})
export class AppComponent  { name = 'Angular'; }
