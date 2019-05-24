import { Component } from '@angular/core';
import { Service } from './global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'summary',
    template: `
    <h1>Summary</h1>
    <h2>Crust: {{getCrust()}}</h2>
    <h2>Size: {{getSize()}}</h2>
    <h2>Toppings:</h2>
    <ul *ngFor="let top of getToppings()">
        <li>{{top}}</li>
    </ul>
    <input type="button" value="submit" (click)="submitOrder()">
    `,
})
export class summary  { 
    // variables
    name = 'summary'; 
    // constructors
    constructor( private service : Service, private router: Router )  {

    }
    ngOnInit()  {}
    // utility functions
    getPrice()  {

    }
    getCrust() : String  {
        return this.service.order.getCrust();
    }
    getSize() : String  {
        return this.service.order.getSize();
    }
    getToppings() : Array<any>  {
        return this.service.order.getToppings();
    }
    submitOrder()   {
        this.service.sendToServer();
    }
}