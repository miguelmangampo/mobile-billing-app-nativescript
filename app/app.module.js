"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Native components
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
// Main components
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
// Custom components
var vehicle_list_component_component_1 = require("./components/vehicle-list-component/vehicle-list-component.component");
var default_loader_component_1 = require("./components/default-loader/default-loader.component");
var client_vehicle_header_component_component_1 = require("./components/client-vehicle-header-component/client-vehicle-header-component.component");
// Vendors components
var angular_1 = require("nativescript-drop-down/angular");
// For GMAPs
var platform = require("platform");
if (platform.isIOS) {
    GMSServices.provideAPIKey('AIzaSyAfidnZ05ZDaKMPvhOsfLeW8cSKrmqM4Zw');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
            angular_1.DropDownModule
        ],
        declarations: [
            app_component_1.AppComponent
        ].concat(app_routing_1.navigatableComponents, [
            vehicle_list_component_component_1.VehicleListComponent,
            default_loader_component_1.DefaultLoaderComponent,
            client_vehicle_header_component_component_1.ClientVehicleHeaderComponent,
        ]),
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEIsc0NBQTJEO0FBQzNELG9EQUFxRTtBQUNyRSxrREFBbUU7QUFDbkUsZ0ZBQThFO0FBQzlFLHNEQUF1RTtBQUV2RSxrQkFBa0I7QUFDbEIsaURBQStDO0FBQy9DLDZDQUE4RDtBQUU5RCxvQkFBb0I7QUFDcEIseUhBQTJHO0FBQzNHLGlHQUE2RjtBQUM3RixvSkFBcUk7QUFFckkscUJBQXFCO0FBQ3JCLDBEQUFnRTtBQUVoRSxZQUFZO0FBQ1osbUNBQXFDO0FBRXJDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25CLFdBQVcsQ0FBQyxhQUFhLENBQUMseUNBQXlDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBcUJELElBQWEsU0FBUztJQUF0QjtJQUF3QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQXpCLElBQXlCO0FBQVosU0FBUztJQW5CckIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUUsdUJBQWdCLENBQUU7UUFDN0IsT0FBTyxFQUFFO1lBQ1Asd0NBQWtCO1lBQ2xCLCtCQUF1QjtZQUN2Qiw2QkFBc0I7WUFDdEIsaUNBQXdCO1lBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDO1lBQ3hDLHdCQUFjO1NBQ2Y7UUFDRCxZQUFZO1lBQ1YsNEJBQVk7aUJBQ1QsbUNBQXFCO1lBQ3hCLHVEQUFvQjtZQUNwQixpREFBc0I7WUFDdEIsd0VBQTRCO1VBQzdCO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csU0FBUyxDQUFHO0FBQVosOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOYXRpdmUgY29tcG9uZW50c1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuLy8gTWFpbiBjb21wb25lbnRzXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbi8vIEN1c3RvbSBjb21wb25lbnRzXG5pbXBvcnQgeyBWZWhpY2xlTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdmVoaWNsZS1saXN0LWNvbXBvbmVudC92ZWhpY2xlLWxpc3QtY29tcG9uZW50LmNvbXBvbmVudFwiXG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9kZWZhdWx0LWxvYWRlci9kZWZhdWx0LWxvYWRlci5jb21wb25lbnRcIlxuaW1wb3J0IHsgQ2xpZW50VmVoaWNsZUhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY2xpZW50LXZlaGljbGUtaGVhZGVyLWNvbXBvbmVudC9jbGllbnQtdmVoaWNsZS1oZWFkZXItY29tcG9uZW50LmNvbXBvbmVudFwiXG5cbi8vIFZlbmRvcnMgY29tcG9uZW50c1xuaW1wb3J0IHsgRHJvcERvd25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93bi9hbmd1bGFyXCI7XG5cbi8vIEZvciBHTUFQc1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xuaWYgKHBsYXRmb3JtLmlzSU9TKSB7IFxuICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KCdBSXphU3lBZmlkblowNVpEYUtNUHZoT3NmTGVXOGNTS3JtcU00WncnKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgc2NoZW1hczogWyBOT19FUlJPUlNfU0NIRU1BIF0sXG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKSxcbiAgICBEcm9wRG93bk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzLFxuICAgIFZlaGljbGVMaXN0Q29tcG9uZW50LFxuICAgIERlZmF1bHRMb2FkZXJDb21wb25lbnQsXG4gICAgQ2xpZW50VmVoaWNsZUhlYWRlckNvbXBvbmVudCxcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge31cbiJdfQ==