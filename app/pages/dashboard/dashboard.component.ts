import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ClientVehicleService } from "../../shared/clientVehicle/clientVehicle.service";
import { CompanyService } from "../../shared/company/company.service";
import { mergeArray, isTokenExpired, formatDate } from "../../utils/utilities";
import { Config } from "../../shared/config";
import { SearchBar } from "ui/search-bar";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

import * as application from "application";
import * as dialogs from "ui/dialogs";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
	selector: "dashboard",
	providers: [ClientVehicleService, CompanyService],
	/*
	styleUrls: [
		"pages/dashboard/dashboard.common.css", 
		"pages/dashboard/dashboard.css"
	],
	templateUrl: "pages/dashboard/dashboard.html",
	*/
	
	styleUrls: [
		"./dashboard.common.css", 
		"./dashboard.css"
	],
	templateUrl: "./dashboard.html",
})
export class DashboardComponent implements OnInit {
	vehicleListFull = [];
	vehicleList = [];
	isLoading = false;
	searchKey: string = '';
	runningTypes;
	commTypes;
	activationTypes;
	dueDateTypes;

	constructor(private clientVehicleService: ClientVehicleService
			, private router: Router
			, private routerExtensions: RouterExtensions
			, private companyService: CompanyService) {
		this.runningTypes = Config.filters.types.running;
		this.commTypes = Config.filters.types.comm;
		this.activationTypes = Config.filters.types.activation;
		this.dueDateTypes = Config.filters.types.dueDate;
	}

	checkIfTokenExpired(error) {
		if (isTokenExpired(error)) {
			alert('Token has been expired');
			this.routerExtensions.back();
			return;
		}
		alert('Error occurs upon loading list');
	}

	loadVehicleList() {
		this.isLoading = true;
		this.clientVehicleService.getList((error, response) => {
			this.isLoading = false;
			if (error) {
				this.checkIfTokenExpired(error);
			}
			this.vehicleListFull = (response) ? response.data : [];
			this.vehicleList = this.filterList(this.searchKey);
		});
	}

	filterList(searchKey: string) {
		// Filter for device status
		let list = _.filter(this.vehicleListFull, (vehicle) => { 
			return ((vehicle.apiData && vehicle.apiData.runningStatus) && (Config.filters.running == this.runningTypes.ALL || vehicle.apiData.runningStatus.status == Config.filters.running))
				&& ((vehicle.apiData && vehicle.apiData.commStatus) && (Config.filters.comm == this.commTypes.ALL || vehicle.apiData.commStatus.status == Config.filters.comm))
				&& ((vehicle.apiData && vehicle.apiData.activationStatus) && (Config.filters.activation == this.activationTypes.ALL || vehicle.apiData.activationStatus.status == Config.filters.activation));
		});
		
		// Adding vehicle with no device data
		_.forEach(this.vehicleListFull, (vehicle) => {
			if (!vehicle.apiData
				|| !vehicle.apiData.runningStatus
				|| !vehicle.apiData.commStatus) {
				list.push(vehicle);
			}
		});

		// Filter for client and vehicle name
		list = _.filter(list, (vehicle) => { 
			return ((vehicle.clientName) && (vehicle.clientName.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0))
				|| ((vehicle.vehicleName) && (vehicle.vehicleName.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0))
				// || ((vehicle.apiData && vehicle.apiData.activationStatus) && (vehicle.apiData.activationStatus.status.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0));
		});

		// For due dates
		if (Config.filters.dueDate != this.dueDateTypes.ALL) {
			const filteredList = list;
			list = [];
			_.forEach(filteredList, (vehicle) => {
				const dueDate = moment(formatDate(vehicle.deadlineDate));
				const dateNow = moment(formatDate(moment()));
				const daysDiff = dueDate.diff(dateNow, 'days', true);

				if (Config.filters.dueDate == this.dueDateTypes.DUE_TODAY && daysDiff == 0) {
					list.push(vehicle);
				} else if (Config.filters.dueDate == this.dueDateTypes.WITH_PAST_DUES && daysDiff < 0) {
					list.push(vehicle);
				} else if (Config.filters.dueDate == this.dueDateTypes.NOT_DUE && daysDiff > 0) {
					list.push(vehicle);
				}
			});
		}

		return list;
	}

	onSearchChanged(args) {
		let searchBar = <SearchBar>args.object;
		this.searchKey = searchBar.text;
		this.vehicleList = this.filterList(this.searchKey);
	}

	ngOnInit() {
		if (isAndroid) {
			application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
				if (this.router.isActive("/dashboard", false)) {
					data.cancel = true; // prevents default back button behavior
					this.signOff();
				}
			});
		}
		this.loadCompanyList();
		this.loadVehicleList();
	}

	loadCompanyList() {
		this.companyService.getList((errorCom, responseCom) => {
			Config.companyList = (responseCom) ? responseCom.list : [];
		});
	}

	signOff() {
		dialogs.confirm({
			title: "Sign-off",
			message: "Are you sure you want to sign-off?",
			okButtonText: "Yes",
			cancelButtonText: "No",
			neutralButtonText: ""
		}).then(result => {
			if (result) {
				this.routerExtensions.back();
			}
		});
	}

	refreshList() {
		if (!this.isLoading) {
			this.loadVehicleList();
		}
	}

	showMap() {
		this.router.navigate(["/mapDevices"]);
	}

	showSettings() {
		this.router.navigate(["/settings"]);
	}

	showFilters() {
		this.router.navigate(["/filters"]);
	}
}