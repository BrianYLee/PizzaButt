import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

@Component({
selector : 'allorders',
template : `<dash></dash>
            <h1>Current orders</h1>
            <ul *ngFor="let order of orders">
                <li>
                    <div>
                        <b>Order ID: {{order.orderID}}</b>
                        <br>
                        Menu Number: {{ order.menuNumber}}
                        <br>
                        Crust: {{order.orderCrust}}
                        <br>
                        Size: {{order.orderSize}}
                        <br>
                        Toppings:
                        <ul *ngFor="let topping of order.orderToppings">
                            <li>{{topping}}</li>
                        </ul>
                    </div>
                </li>
            </ul>
            `
})
export class allOrders implements OnInit{ 
    orders : Array<OrderItem> = [];
    constructor( private http: Http, private router: Router ){};
    ngOnInit(){
      let url = 'http://localhost:4000/allOrders'
      this.http.get(url).toPromise().then((res)=>{
         let object = res.json(); 
         console.log(object)
         //Should do error checking. *caution to the wind it is*
        let buffer : Array<any> = object.orders;
        for( let item of buffer)    {
            this.orders.push(new OrderItem(
                item.orderID, 
                item.orderContent.menuNumber,
                item.orderContent.size,
                item.orderContent.crust,
                item.orderContent.toppings)
            );
        }
      }).catch(()=>{ 
          //Should probably display something to the user
          //But, teaching example!
          console.log("Could not get posts");});
   }

}
class OrderItem {
    orderID : any;
    menuNumber : any;
    orderSize : any;
    orderCrust : any;
    orderToppings : Array<any>;
    constructor(id : any, menunum : any, size : any, crust : any, toppings : Array<any>)    {
        this.orderID = id;
        this.menuNumber = menunum;
        this.orderSize = this.sizeToString(size);
        this.orderCrust = this.crustToString(crust);
        this.orderToppings = toppings;
        return;
    }
    sizeToString(num : any) : String {
        let size : String = "";
        switch (num)    {
            case 0:
                size = "Small";
                break;
            case 1:
                size = "Medium";
                break;
            case 2:
                size = "Large";
                break;
            default:
                size = "Error size, domain out of range";
                break;
        }
        return size;
    } 
    crustToString(num : any) : String {
        let crust : String = "";
        switch (num)    {
            case 0:
                crust = "Normal";
                break;
            case 1:
                crust = "Thin";
                break;
            case 2:
                crust = "Thick";
                break;
            default:
                crust = "Error size, domain out of range";
                break;
        }
        return crust;
    }  
}
