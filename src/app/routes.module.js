"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*This is a new module.
  This module contains the table of
  endpoints and the components they map too
  */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dash_component_1 = require("./dash.component");
var menu_component_1 = require("./menu.component");
var orderform_component_1 = require("./orderform.component");
var summary_component_1 = require("./summary.component");
var ShowOrders_component_1 = require("./ShowOrders.component");
//Import application components
var routes = [
    { path: '', redirectTo: '/dash', pathMatch: 'full' },
    { path: 'dash', component: dash_component_1.dash },
    { path: 'menu', component: menu_component_1.menu },
    { path: 'order', component: orderform_component_1.orderform },
    { path: 'summary', component: summary_component_1.summary },
    { path: 'allOrders', component: ShowOrders_component_1.allOrders }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=routes.module.js.map