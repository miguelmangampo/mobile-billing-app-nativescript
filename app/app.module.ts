// Native components
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

// Main components
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";

// Custom components
import { VehicleListComponent } from "./components/vehicle-list-component/vehicle-list-component.component"
import { DefaultLoaderComponent } from "./components/default-loader/default-loader.component"
import { ClientVehicleHeaderComponent } from "./components/client-vehicle-header-component/client-vehicle-header-component.component"

// Vendors components
import { DropDownModule } from "nativescript-drop-down/angular";

// For GMAPs
import * as platform from "platform";
declare var GMSServices: any;
if (platform.isIOS) { 
  GMSServices.provideAPIKey('AIzaSyAfidnZ05ZDaKMPvhOsfLeW8cSKrmqM4Zw');
}

@NgModule({
  schemas: [ NO_ERRORS_SCHEMA ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    DropDownModule
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents,
    VehicleListComponent,
    DefaultLoaderComponent,
    ClientVehicleHeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
