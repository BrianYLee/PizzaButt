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
var allOrders = (function () {
    function allOrders(http, router) {
        this.http = http;
        this.router = router;
        this.orders = [];
    }
    ;
    allOrders.prototype.ngOnInit = function () {
        var _this = this;
        var url = 'http://localhost:4000/allOrders';
        this.http.get(url).toPromise().then(function (res) {
            var object = res.json();
            console.log(object);
            //Should do error checking. *caution to the wind it is*
            var buffer = object.orders;
            for (var _i = 0, buffer_1 = buffer; _i < buffer_1.length; _i++) {
                var item = buffer_1[_i];
                _this.orders.push(new OrderItem(item.orderID, item.orderContent.menuNumber, item.orderContent.size, item.orderContent.crust, item.orderContent.toppings));
            }
        }).catch(function () {
            //Should probably display something to the user
            //But, teaching example!
            console.log("Could not get posts");
        });
    };
    return allOrders;
}());
allOrders = __decorate([
    core_1.Component({
        selector: 'allorders',
        template: "<dash></dash>\n            <h1>Current orders</h1>\n            <ul *ngFor=\"let order of orders\">\n                <li>\n                    <div>\n                        <b>Order ID: {{order.orderID}}</b>\n                        <br>\n                        Menu Number: {{ order.menuNumber}}\n                        <br>\n                        Crust: {{order.orderCrust}}\n                        <br>\n                        Size: {{order.orderSize}}\n                        <br>\n                        Toppings:\n                        <ul *ngFor=\"let topping of order.orderToppings\">\n                            <li>{{topping}}</li>\n                        </ul>\n                    </div>\n                </li>\n            </ul>\n            "
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], allOrders);
exports.allOrders = allOrders;
var OrderItem = (function () {
    function OrderItem(id, menunum, size, crust, toppings) {
        this.orderID = id;
        this.menuNumber = menunum;
        this.orderSize = this.sizeToString(size);
        this.orderCrust = this.crustToString(crust);
        this.orderToppings = toppings;
        return;
    }
    OrderItem.prototype.sizeToString = function (num) {
        var size = "";
        switch (num) {
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
    };
    OrderItem.prototype.crustToString = function (num) {
        var crust = "";
        switch (num) {
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
    };
    return OrderItem;
}());
//# sourceMappingURL=ShowOrders.component.js.map