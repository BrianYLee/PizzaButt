import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable() export class Service   {
    // orderform variables
    order : Order = new Order(1 ,0, 0);    // defaults menu, crust, and size to 1, normal, and small. In-sync with order forms radio buttons
//    price : number = 0;

    // server variables
    menu1 : Menu = new Menu();
    menu2 : Menu = new Menu();

    // menu for use on client
    selectedMenu : Menu;

    constructor( private http : Http, private netConnect : Http, private router: Router )   {
        // router, http, netconnect etc...
        this.getMenu();
        //this.getMenu(2);
    }
    // server get functions
    getMenu()   {
        // domain: {which | which = 1,2}
        let url = 'http://localhost:4000/menu';
        this.http.get(url).toPromise().then((res)=>{
            let object = res.json(); 
            console.log("getMenu() got object: " + object);
            this.menu1.toppings = object.menu[0].toppings;
            this.menu1.prices = object.menu[0].prices;
            console.log(this.menu1.toppings);
            console.log(this.menu1.prices);

            this.menu2.toppings = object.menu[1].toppings;
            this.menu2.prices = object.menu[1].prices;
            console.log(this.menu2.toppings);
            console.log(this.menu2.prices);
        }).catch(() => { 
            console.log("Could not get menu, i must be acting gay");
        });
    }
    buildPair() : Array<any>    {
        let pairs = [];
        for(let i = 0; i <6; i++)  {
            let buffer = "";
            buffer = String(this.selectedMenu.toppings[i]);
            buffer += "...$" + String(this.selectedMenu.prices[i]);
            pairs.push(buffer);
        }
        return pairs;
    }
    refreshSelection()  {
        this.order = new Order(1, 0, 0);
    }
    sendToServer() {
        let URL = 'http://localhost:4000/postOrder';
        let myHeaders : any = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: myHeaders });
        return this.http.post(URL, this.order, URL).toPromise().then((response: any) => {
            this.router.navigate(['dash']);
        });
    }
}
class Menu  {
    toppings : Array<any>;
    prices : Array<any>;
    constructor() {
        this.toppings = new Array();
        this.prices = new Array();
        return;
    }
}

class Order {
    menuNumber : number;
    crust : number;
    size : number;
    toppings : Array<number>;

    constructor(menuNum : number, crust : number, size : number)   {
        this.menuNumber = menuNum;
        this.crust = crust;
        this.size = size;
        this.toppings = new Array<number>();
        return;
    }
    setMenu(which : number) {
        this.menuNumber = which;
    }
    setCrust(newCrust : any)    {
        this.crust = newCrust;
    }
    setSize(newSize : any)  {
        this.size = newSize;
    }
    addTopping(topping : any) : boolean   {
        if(this.toppings.length < 10)   {
            this.toppings.push(topping);
            return true;
        }
        return false;
    }
    removeTopping(topping : any)    {
        let idx = this.toppings.indexOf(topping);
        if(idx > -1)    {
            this.toppings.splice(idx, 1);
            console.log("found and removed.");
            return;
        }
        console.log("not found");
        return;
    }

    // get functions
    getCrust() : String {
        let crust : String = "Error";
        switch(this.crust)  {
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
                break;
        }
        return crust;
    }
    getSize() : String {
        let size : String = "Error";
        switch(this.size)  {
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
                break;
        }
        return size;
    }
    getToppings() : Array<any>   {
        return this.toppings;
    }
}