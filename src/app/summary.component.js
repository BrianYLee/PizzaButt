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
var summary = (function () {
    // constructors
    function summary(service, router) {
        this.service = service;
        this.router = router;
        // variables
        this.name = 'summary';
    }
    summary.prototype.ngOnInit = function () { };
    // utility functions
    summary.prototype.getPrice = function () {
    };
    summary.prototype.getCrust = function () {
        return this.service.order.getCrust();
    };
    summary.prototype.getSize = function () {
        return this.service.order.getSize();
    };
    summary.prototype.getToppings = function () {
        return this.service.order.getToppings();
    };
    summary.prototype.submitOrder = function () {
        this.service.sendToServer();
    };
    return summary;
}());
summary = __decorate([
    core_1.Component({
        selector: 'summary',
        template: "\n    <h1>Summary</h1>\n    <h2>Crust: {{getCrust()}}</h2>\n    <h2>Size: {{getSize()}}</h2>\n    <h2>Toppings:</h2>\n    <ul *ngFor=\"let top of getToppings()\">\n        <li>{{top}}</li>\n    </ul>\n    <input type=\"button\" value=\"submit\" (click)=\"submitOrder()\">\n    ",
    }),
    __metadata("design:paramtypes", [global_service_1.Service, router_1.Router])
], summary);
exports.summary = summary;
//# sourceMappingURL=summary.component.js.map