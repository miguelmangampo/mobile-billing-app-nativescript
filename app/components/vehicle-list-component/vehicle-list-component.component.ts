import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { formatDate, formatDatetime } from "../../utils/utilities";

import * as moment from 'moment';

@Component({
	selector: "VehicleListComponent",
	providers: [],
	/*
	templateUrl: "components/vehicle-list-component/vehicle-list-component.html",
	styleUrls: [
		"components/vehicle-list-component/vehicle-list-component.common.css", 
		"components/vehicle-list-component/vehicle-list-component.css",
	],
	*/
	
	templateUrl: "./vehicle-list-component.html",
	styleUrls: [
		"./vehicle-list-component.common.css", 
		"./vehicle-list-component.css",
	],
})
export class VehicleListComponent implements OnInit {
	@Input() vehicleList;	
	isSearching = false;

	constructor(private router: Router) {

	}

	formatDateString(date) {
		return formatDate(date);
	}

	formatDateTimeToString(date) {
		return formatDatetime(date);
	}

	getDueStatusClass(deadlineDate) {
		const dueDate = moment(this.formatDateString(deadlineDate));
		const dateNow = moment(this.formatDateString(moment()));
		const daysDiff = dueDate.diff(dateNow, 'days', true);
		let status = "";
		if (deadlineDate == null) {
			status = 'DONE';
		} else if (!dueDate.isValid()) {
			status = 'BELOW';
		} else if (daysDiff < 0) {
			status = 'BELOW';
		} else if (daysDiff == 0) {
			status = 'TODAY';
		}
		return status;
	}

	getMobilityStatus(mobility) {
		return (mobility) ? mobility.status : '';
	}

	getMobilityUpdatedDate(mobility) {
		return (mobility) ? this.formatDateTimeToString(mobility.updatedAt) : '';
	}

	device_Clicked(data) {
		const serviceEntID = (data && data.apiData) ? data.apiData.id : 0; 
		let navigationExtras: NavigationExtras = {
			queryParams: { 
				serviceEntityID: serviceEntID,
				clientName: data.clientName,
				vehicleName: data.vehicleName
			}
		};
		this.router.navigate(["/deviceDetails"], navigationExtras);
	}

	payments_Clicked(data) {
		let navigationExtras: NavigationExtras = {
			queryParams: { 
				clientVehicleID: data.clientVehicleID,
				clientName: data.clientName,
				vehicleName: data.vehicleName
			}
		};
		this.router.navigate(["/paymentList"], navigationExtras);
	}

	ngOnInit() {

	}

	ngOnChanges(changes) {

	}
}