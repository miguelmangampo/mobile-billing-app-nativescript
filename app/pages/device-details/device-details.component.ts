import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { formatDatetime, isTokenExpired } from "../../utils/utilities";
import { ServiceEntityService } from "../../shared/serviceEntity/serviceEntity.service";
import * as dialogs from "ui/dialogs";

@Component({
	selector: "deviceDetails",
	providers: [ServiceEntityService],
	/*
	templateUrl: "pages/device-details/device-details.html",
	styleUrls: [
		"pages/device-details/device-details-common.css", 
		"pages/device-details/device-details.css"
	]
	*/
	
	templateUrl: "./device-details.html",
	styleUrls: [
		"./device-details-common.css", 
		"./device-details.css"
	]
})
export class DeviceDetailsComponent implements OnInit {
	serviceEntityID;
	clientName: string;
	vehicleName: string;
	deviceDetails;
	isLoading = false;
	activationText: string = '';

	runningStatus: string;
	commStatus: string;
	activationStatus: string;

	constructor(private route: ActivatedRoute
			, private serviceEntityService: ServiceEntityService
			, private routerExtensions: RouterExtensions) {
		this.route.queryParams.subscribe(params => {
			this.serviceEntityID = params["serviceEntityID"];
			this.clientName = params["clientName"];
			this.vehicleName = params["vehicleName"];
		});
	}

	formatDatetimeString(date) {
		return formatDatetime(date);
	}

	checkIfTokenExpired(error) {
		if (isTokenExpired(error)) {
			alert('Token has been expired');
			this.routerExtensions.back();
			return;
		}
		alert('Error occurs upon loading data');
	}

	loadData() {
		this.isLoading = true;
		this.serviceEntityService.getOne(this.serviceEntityID, (error, response) => {
			this.isLoading = false;
			if (error) {
				this.checkIfTokenExpired(error);
			}
			this.deviceDetails = (response) ? response : null;
			this.runningStatus = (this.deviceDetails && this.deviceDetails.runningStatus) 
							? this.deviceDetails.runningStatus.status : '';
			this.commStatus = (this.deviceDetails && this.deviceDetails.commStatus) 
							? this.deviceDetails.commStatus.status : '';
			this.activationStatus = (this.deviceDetails && this.deviceDetails.activationStatus) 
							? this.deviceDetails.activationStatus.status : '';

			this.activationText = this.getActionButtonText();
			if (this.activationText != 'CANCEL_RESERVATION') {
				this.activationText += this.isReserve() ? ' (RESERVE)' : '';
			}
		});
	}

	isReserve() {
		if ((this.activationStatus.trim().toUpperCase() == 'RESERVING_TO_ACTIVATE')
			|| (this.activationStatus.trim().toUpperCase() == 'RESERVING_TO_DEACTIVATE')) {
			return true;
		}
		return (this.commStatus === 'NOTCOMM');
	}

	ngOnInit() {
		this.loadData();
	}

	refreshData() {
		if (!this.isLoading) {
			this.loadData();
		}
	}

	getActionButtonText() {
		if (!this.deviceDetails.activationStatus) { return ''; }
		let actionText = '';
		if (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'INACTIVE') {
			actionText = 'ACTIVATE';
		} else if (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'ACTIVE') {
			actionText = 'DEACTIVATE';
		} else if ((this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'DEACTIVATING')
			|| (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'WAITING_TO_DEACT')
			|| (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'ACTIVATING')
			|| (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'WAITING_TO_ACT')) {
			actionText = 'CANCEL';
		} else if ((this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'RESERVING_TO_ACTIVATE')
			|| (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'RESERVING_TO_DEACTIVATE')) {
			actionText = 'CANCEL_RESERVATION';
		}
		return actionText;
	}

	goBack() {
		this.routerExtensions.back();
	}

	activation() {
		const activationStatus = this.getActionButtonText();
		dialogs.confirm({
			title: activationStatus,
			message: 'Are you sure you want to ' + activationStatus + '?',
			okButtonText: "Yes",
			cancelButtonText: "No",
			neutralButtonText: ""
		}).then(result => {
			if (result) {
				const reservation = this.isReserve();
				this.isLoading = true;
				this.serviceEntityService.activation(this.serviceEntityID, activationStatus, reservation, (error, response) => {
					if (error) {
						this.isLoading = false;
						alert('Error upon changing activation status.');
						return;
					}
					this.loadData();
				});
			}
		});
	}
}