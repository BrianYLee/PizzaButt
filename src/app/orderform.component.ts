import { Component } from '@angular/core';
import { Service } from './global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'orderform',
    template: `
    <dash></dash>
    <h1>Order Form</h1>
    <h2>Choose a crust</h2>
    <form id="crusts" name="crusts">
        <span>
            <!--for radio, use (change)="function(); function2() ..."-->
            <input type="radio" name="crust" id="normal" checked="checked" (change)="setCrust(0)">
            Normal - $0.00
            <br>
            <input type="radio" name="crust" id="thin" (change)="setCrust(1)">
            Thin - $2.50
            <br>
            <input type="radio" name="crust" id="thick" (change)="setCrust(2)">
            Thick - $5.00
            <br>
        </span>
    </form>
    <h2>Select a size</h2>
    <form id="sizes" name="sizes">
        <span>
            <input type="radio" name="size" id="small" checked="checked" (change)="setSize(0)">
            Small - $15.00
            <br>
            <input type="radio" name="size" id="medium" (change)="setSize(1)">
            Medium - $20.00
            <br>
            <input type="radio" name="size" id="large" (change)="setSize(2)">
            Large - $25.00
            <br>
        </span>
    </form>
 
    <h2>Choose your toppings</h2>
    <form id="toppings">
        <ul *ngFor="let item of this.service.selectedMenu.toppings">
            <li>
                {{item}} ... Selected: {{getToppingCount(item)}}
                <input type="button" value="add" (click)="addTopping(item)">
                <input type="button" value="remove" (click)="removeTopping(item)">
            </li>
        </ul>
    </form>   
    <input type="button" value="Next" (click)=gotoSummary()>
    `,
})
export class orderform  { 
    // variables
    name = 'order form'; 
    menus : Array<any> = [];
    // constructors
    constructor( private service : Service, private router: Router )  {

    }
    ngOnInit()  {}
    // utility functions
    log(what : any)    {
        console.log(what);
    }
    // server functions
    setCrust(crust : any)  {
        this.service.order.setCrust(crust);
        this.log("crust: " + crust);
        return;
    }
    setSize(size : any)   {
        this.service.order.setSize(size);
        this.log("size: " + size);
        return;
    }
    getToppingCount(which : any) : number   {
        let count = 0;
        for(let i = 0; i <  this.service.order.toppings.length; i++)    {
            if(which == this.service.order.toppings[i]) {
                count++;
            }
        }
        return count;
    }
    addTopping(top : any)    {
        if(!this.service.order.addTopping(top)) {
            alert("Maximum 10 toppings!");
        }
        return;
    }
    removeTopping(top : any) {
        this.service.order.removeTopping(top);
        return;
    }
    gotoSummary()   {
        this.router.navigate(['summary']);
    }
}