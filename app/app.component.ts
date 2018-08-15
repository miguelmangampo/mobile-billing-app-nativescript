import { Component } from "@angular/core";

import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

// import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);
registerElement('RadSideDrawer', () => RadSideDrawer);

registerElement('CardView', () => require("nativescript-cardview").CardView);

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {}