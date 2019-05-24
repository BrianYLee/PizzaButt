"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
var Service = (function () {
    function Service(http, netConnect, router) {
        this.http = http;
        this.netConnect = netConnect;
        this.router = router;
        // orderform variables
        this.order = new Order(1, 0, 0); // defaults menu, crust, and size to 1, normal, and small. In-sync with order forms radio buttons
        //    price : number = 0;
        // server variables
        this.menu1 = new Menu();
        this.menu2 = new Menu();
        // router, http, netconnect etc...
        this.getMenu();
        //this.getMenu(2);
    }
    // server get functions
    Service.prototype.getMenu = function () {
        var _this = this;
        // domain: {which | which = 1,2}
        var url = 'http://localhost:4000/menu';
        this.http.get(url).toPromise().then(function (res) {
            var object = res.json();
            console.log("getMenu() got object: " + object);
            _this.menu1.toppings = object.menu[0].toppings;
            _this.menu1.prices = object.menu[0].prices;
            console.log(_this.menu1.toppings);
            console.log(_this.menu1.prices);
            _this.menu2.toppings = object.menu[1].toppings;
            _this.menu2.prices = object.menu[1].prices;
            console.log(_this.menu2.toppings);
            console.log(_this.menu2.prices);
        }).catch(function () {
            console.log("Could not get menu, i must be acting gay");
        });
    };
    Service.prototype.buildPair = function () {
        var pairs = [];
        for (var i = 0; i < 6; i++) {
            var buffer = "";
            buffer = String(this.selectedMenu.toppings[i]);
            buffer += "...$" + String(this.selectedMenu.prices[i]);
            pairs.push(buffer);
        }
        return pairs;
    };
    Service.prototype.refreshSelection = function () {
        this.order = new Order(1, 0, 0);
    };
    Service.prototype.sendToServer = function () {
        var _this = this;
        var URL = 'http://localhost:4000/postOrder';
        var myHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: myHeaders });
        return this.http.post(URL, this.order, URL).toPromise().then(function (response) {
            _this.router.navigate(['dash']);
        });
    };
    return Service;
}());
Service = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_1.Http, router_1.Router])
], Service);
exports.Service = Service;
var Menu = (function () {
    function Menu() {
        this.toppings = new Array();
        this.prices = new Array();
        return;
    }
    return Menu;
}());
var Order = (function () {
    function Order(menuNum, crust, size) {
        this.menuNumber = menuNum;
        this.crust = crust;
        this.size = size;
        this.toppings = new Array();
        return;
    }
    Order.prototype.setMenu = function (which) {
        this.menuNumber = which;
    };
    Order.prototype.setCrust = function (newCrust) {
        this.crust = newCrust;
    };
    Order.prototype.setSize = function (newSize) {
        this.size = newSize;
    };
    Order.prototype.addTopping = function (topping) {
        if (this.toppings.length < 10) {
            this.toppings.push(topping);
            return true;
        }
        return false;
    };
    Order.prototype.removeTopping = function (topping) {
        var idx = this.toppings.indexOf(topping);
        if (idx > -1) {
            this.toppings.splice(idx, 1);
            console.log("found and removed.");
            return;
        }
        console.log("not found");
        return;
    };
    // get functions
    Order.prototype.getCrust = function () {
        var crust = "Error";
        switch (this.crust) {
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
    };
    Order.prototype.getSize = function () {
        var size = "Error";
        switch (this.size) {
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
    };
    Order.prototype.getToppings = function () {
        return this.toppings;
    };
    return Order;
}());
//# sourceMappingURL=global.service.js.map