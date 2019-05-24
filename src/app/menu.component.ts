import { Component } from '@angular/core';
import { Service } from './global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'menu',
    template: `
        <dash></dash>
        <h1>Menu Selection</h1>
        <input type="button" value="Menu 1" (click)="menu1()">
        <input type="button" value="Menu 2" (click)="menu2()">
        <span id="menu">
            <ul *ngFor='let pair of service.buildPair()'>
                <li>{{pair}}</li>
            </ul>
        </span>
        <input type="button" value="Select this Menu" (click)="gotoOrderForm()">
    `,
})        

export class menu   {
    name = "Menu component";
    constructor( private service : Service, private router: Router ) { 

    }
    ngOnInit() {
        this.menu1();
    }
    menu1() {
        this.service.selectedMenu = this.service.menu1;
        this.service.refreshSelection();
        this.service.order.setMenu(1);
        // remove all selections
//        this.service.refreshSelection();
        return;
    }
    menu2() {
        this.service.selectedMenu = this.service.menu2;
        this.service.refreshSelection();
        this.service.order.setMenu(2);
        // remove all selections
        //this.service.refreshSelection();
        return;
    }
    gotoOrderForm() {
        this.router.navigate(['order']);
    }
}