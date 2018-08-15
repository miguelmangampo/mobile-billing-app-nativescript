import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Config } from "../../shared/config";
import { isCompanyOrigin, formatDatetime } from "../../utils/utilities";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
	selector: "settings",
	providers: [],
	/*
	templateUrl: "pages/settings/settings.html",
	styleUrls: [
		"pages/settings/settings-common.css", 
		"pages/settings/settings.css"
	]
	*/
	
	templateUrl: "./settings.html",
	styleUrls: [
		"./settings-common.css", 
		"./settings.css"
	]
})
export class SettingsComponent implements OnInit {
	settings = {
		appDateTime: '',
		urlEndpoint: '',
		maxRecords: 0,
		company: {},
	};

	constructor(private routerExtensions: RouterExtensions) {}

	ngOnInit() {
		this.settings.urlEndpoint = Config.apiUrl;
		this.settings.maxRecords = Config.maxPage;
		this.settings.appDateTime = formatDatetime(moment());
	}

	goBack() {
		this.routerExtensions.back();
	}

	save() {
		Config.apiUrl = this.settings.urlEndpoint;
		Config.maxPage = this.settings.maxRecords;
		alert('Settings successfully saved.')
	}
}