import { Component, ElementRef, ViewChild, Input } from "@angular/core";

@Component({
	selector: "ClientVehicleHeaderComponent",
	providers: [],
	/*
	templateUrl: "components/client-vehicle-header-component/client-vehicle-header-component.html",
	styleUrls: [
		"components/client-vehicle-header-component/client-vehicle-header-component.common.css", 
		"components/client-vehicle-header-component/client-vehicle-header-component.css",
	],
	*/
	
	templateUrl: "./client-vehicle-header-component.html",
	styleUrls: [
		"./client-vehicle-header-component.common.css", 
		"./client-vehicle-header-component.css",
	],
})
export class ClientVehicleHeaderComponent {
	@Input() clientName;
	@Input() vehicleName;
}