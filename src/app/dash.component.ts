import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'dash',
  template: `<h1>Dashboard: PizzaButt</h1>
             <input type="button" value="New Order" (click)="order()">
             <input type="button" value="View Orders" (click)="seeOrders()">
             `
})

export class dash {
    constructor(private router : Router){};
    name : String = "dash";
    order(){
        this.router.navigate(['menu']);
    };
    seeOrders(){
        this.router.navigate(['allOrders']);
    };
}