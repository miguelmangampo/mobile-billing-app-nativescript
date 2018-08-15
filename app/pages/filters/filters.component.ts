import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Config } from "../../shared/config";
import * as _ from 'lodash';

import { isCompanyOrigin } from "../../utils/utilities";

@Component({
	selector: "filters",
	providers: [],
	/*
	templateUrl: "pages/filters/filters.html",
	styleUrls: ["pages/filters/filters-common.css", "pages/filters/filters.css"]
	*/
	
	templateUrl: "./filters.html",
	styleUrls: ["./filters-common.css", "./filters.css"]
})
export class FiltersComponent implements OnInit {
	isCompanyOrigin = false;

	companyDropDownIndex = 0;
	companyDropDownItems: Array<string> = [];
	_companyList = [];

	runningStatus_DropDownIndex = 0;
	runningStatus_DropDownItems: Array<string>;

	commStatus_DropDownIndex = 0;
	commStatus_DropDownItems: Array<string>;

	activationStatus_DropDownIndex = 0;
	activationStatus_DropDownItems: Array<string>;

	dueDate_DropDownIndex = 0;
	dueDate_DropDownItems: Array<string>;

	constructor(private routerExtensions: RouterExtensions) {
		this.isCompanyOrigin = isCompanyOrigin();
		this.initCompanyDropDown();

		const runningTypes = Config.filters.types.running;
		this.runningStatus_DropDownItems = [
			runningTypes.ALL,
			runningTypes.RUN,
			runningTypes.IDLING,
			runningTypes.STOP,
			runningTypes.UNKNOWN,
		];
		this.runningStatus_DropDownIndex = _.findIndex(this.runningStatus_DropDownItems, (status) => {
			return status == Config.filters.running;
		});

		const commTypes = Config.filters.types.comm;
		this.commStatus_DropDownItems = [
			commTypes.ALL,
			commTypes.COMM,
			commTypes.NOTCOMM,
			commTypes.SLEEP,
			commTypes.UNKNOWN,
		];
		this.commStatus_DropDownIndex = _.findIndex(this.commStatus_DropDownItems, (status) => {
			return status == Config.filters.comm;
		});

		const activationTypes = Config.filters.types.activation;
		this.activationStatus_DropDownItems = [
			activationTypes.ALL,
			activationTypes.ACTIVE,
			activationTypes.INACTIVE,
			activationTypes.ACTIVATING,
			activationTypes.DEACTIVATING,
			activationTypes.WAITING_TO_ACT,
			activationTypes.WAITING_TO_DEACT,
			activationTypes.UNKNOWN,
			activationTypes.RESERVING_TO_ACTIVATE,
			activationTypes.RESERVING_TO_DEACTIVATE,
		];
		this.activationStatus_DropDownIndex = _.findIndex(this.activationStatus_DropDownItems, (status) => {
			return status == Config.filters.activation;
		});

		const dueDateTypes = Config.filters.types.dueDate;
		this.dueDate_DropDownItems = [
			dueDateTypes.ALL,
			dueDateTypes.DUE_TODAY,
			dueDateTypes.WITH_PAST_DUES,
			dueDateTypes.NOT_DUE,
		];
		this.dueDate_DropDownIndex = _.findIndex(this.dueDate_DropDownItems, (status) => {
			return status == Config.filters.dueDate;
		});
	}

	ngOnInit() {
		
	}

	initCompanyDropDown() {
		this._companyList = Config.companyList;
		let counter = 0;
		_.forEach(this._companyList, (company) => {
			if (company.id == Config.companyID) {
				this.companyDropDownIndex = counter;
			}
			this.companyDropDownItems.push(company.companyCode + ' / ' + company.societyID);
			counter++;
		});
	}

	goBack() {
		this.routerExtensions.back();
	}

	save() {
		const selectedCompany = this._companyList[this.companyDropDownIndex];
		Config.companyID = selectedCompany.id;
		Config.societyID = selectedCompany.societyID;
		
		Config.filters.running = this.runningStatus_DropDownItems[this.runningStatus_DropDownIndex];
		Config.filters.comm = this.commStatus_DropDownItems[this.commStatus_DropDownIndex];
		Config.filters.activation = this.activationStatus_DropDownItems[this.activationStatus_DropDownIndex];
		Config.filters.dueDate = this.dueDate_DropDownItems[this.dueDate_DropDownIndex];
		alert('Filters successfully saved.')
	}
}