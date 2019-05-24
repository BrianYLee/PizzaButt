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
var menu = (function () {
    function menu(service, router) {
        this.service = service;
        this.router = router;
        this.name = "Menu component";
    }
    menu.prototype.ngOnInit = function () {
        this.menu1();
    };
    menu.prototype.menu1 = function () {
        this.service.selectedMenu = this.service.menu1;
        this.service.refreshSelection();
        this.service.order.setMenu(1);
        // remove all selections
        //        this.service.refreshSelection();
        return;
    };
    menu.prototype.menu2 = function () {
        this.service.selectedMenu = this.service.menu2;
        this.service.refreshSelection();
        this.service.order.setMenu(2);
        // remove all selections
        //this.service.refreshSelection();
        return;
    };
    menu.prototype.gotoOrderForm = function () {
        this.router.navigate(['order']);
    };
    return menu;
}());
menu = __decorate([
    core_1.Component({
        selector: 'menu',
        template: "\n        <dash></dash>\n        <h1>Menu Selection</h1>\n        <input type=\"button\" value=\"Menu 1\" (click)=\"menu1()\">\n        <input type=\"button\" value=\"Menu 2\" (click)=\"menu2()\">\n        <span id=\"menu\">\n            <ul *ngFor='let pair of service.buildPair()'>\n                <li>{{pair}}</li>\n            </ul>\n        </span>\n        <input type=\"button\" value=\"Select this Menu\" (click)=\"gotoOrderForm()\">\n    ",
    }),
    __metadata("design:paramtypes", [global_service_1.Service, router_1.Router])
], menu);
exports.menu = menu;
//# sourceMappingURL=menu.component.js.map