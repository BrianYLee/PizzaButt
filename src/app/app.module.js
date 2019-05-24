"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @angular imports
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var routes_module_1 = require("./routes.module");
// component imports - declarations
var app_component_1 = require("./app.component");
var orderform_component_1 = require("./orderform.component");
var menu_component_1 = require("./menu.component");
var summary_component_1 = require("./summary.component");
var ShowOrders_component_1 = require("./ShowOrders.component");
var dash_component_1 = require("./dash.component");
// service imports - providers
var global_service_1 = require("./global.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            routes_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            orderform_component_1.orderform,
            menu_component_1.menu,
            summary_component_1.summary,
            ShowOrders_component_1.allOrders,
            dash_component_1.dash
        ],
        providers: [
            global_service_1.Service
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map