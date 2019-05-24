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
var global_service_1 = require("./global.service");
var router_1 = require("@angular/router");
var orderform = (function () {
    // constructors
    function orderform(service, router) {
        this.service = service;
        this.router = router;
        // variables
        this.name = 'order form';
        this.menus = [];
    }
    orderform.prototype.ngOnInit = function () { };
    // utility functions
    orderform.prototype.log = function (what) {
        console.log(what);
    };
    // server functions
    orderform.prototype.setCrust = function (crust) {
        this.service.order.setCrust(crust);
        this.log("crust: " + crust);
        return;
    };
    orderform.prototype.setSize = function (size) {
        this.service.order.setSize(size);
        this.log("size: " + size);
        return;
    };
    orderform.prototype.getToppingCount = function (which) {
        var count = 0;
        for (var i = 0; i < this.service.order.toppings.length; i++) {
            if (which == this.service.order.toppings[i]) {
                count++;
            }
        }
        return count;
    };
    orderform.prototype.addTopping = function (top) {
        if (!this.service.order.addTopping(top)) {
            alert("Maximum 10 toppings!");
        }
        return;
    };
    orderform.prototype.removeTopping = function (top) {
        this.service.order.removeTopping(top);
        return;
    };
    orderform.prototype.gotoSummary = function () {
        this.router.navigate(['summary']);
    };
    return orderform;
}());
orderform = __decorate([
    core_1.Component({
        selector: 'orderform',
        template: "\n    <dash></dash>\n    <h1>Order Form</h1>\n    <h2>Choose a crust</h2>\n    <form id=\"crusts\" name=\"crusts\">\n        <span>\n            <!--for radio, use (change)=\"function(); function2() ...\"-->\n            <input type=\"radio\" name=\"crust\" id=\"normal\" checked=\"checked\" (change)=\"setCrust(0)\">\n            Normal - $0.00\n            <br>\n            <input type=\"radio\" name=\"crust\" id=\"thin\" (change)=\"setCrust(1)\">\n            Thin - $2.50\n            <br>\n            <input type=\"radio\" name=\"crust\" id=\"thick\" (change)=\"setCrust(2)\">\n            Thick - $5.00\n            <br>\n        </span>\n    </form>\n    <h2>Select a size</h2>\n    <form id=\"sizes\" name=\"sizes\">\n        <span>\n            <input type=\"radio\" name=\"size\" id=\"small\" checked=\"checked\" (change)=\"setSize(0)\">\n            Small - $15.00\n            <br>\n            <input type=\"radio\" name=\"size\" id=\"medium\" (change)=\"setSize(1)\">\n            Medium - $20.00\n            <br>\n            <input type=\"radio\" name=\"size\" id=\"large\" (change)=\"setSize(2)\">\n            Large - $25.00\n            <br>\n        </span>\n    </form>\n \n    <h2>Choose your toppings</h2>\n    <form id=\"toppings\">\n        <ul *ngFor=\"let item of this.service.selectedMenu.toppings\">\n            <li>\n                {{item}} ... Selected: {{getToppingCount(item)}}\n                <input type=\"button\" value=\"add\" (click)=\"addTopping(item)\">\n                <input type=\"button\" value=\"remove\" (click)=\"removeTopping(item)\">\n            </li>\n        </ul>\n    </form>   \n    <input type=\"button\" value=\"Next\" (click)=gotoSummary()>\n    ",
    }),
    __metadata("design:paramtypes", [global_service_1.Service, router_1.Router])
], orderform);
exports.orderform = orderform;
//# sourceMappingURL=orderform.component.js.map