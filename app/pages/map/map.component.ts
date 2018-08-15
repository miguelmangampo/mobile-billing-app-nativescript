import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { ClientVehicleService } from "../../shared/clientVehicle/clientVehicle.service";
import { Config } from "../../shared/config";
import { SearchBar } from "ui/search-bar";
import { RouterExtensions } from "nativescript-angular/router";
import { isTokenExpired, formatDate } from "../../utils/utilities";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
	selector: "MapComponent",
	providers: [ClientVehicleService],
	/*
	templateUrl: "pages/map/map.html",
	styleUrls: [
		"pages/map/map.common.css", 
		"pages/map/map.css",
	],
	*/
	
	templateUrl: "./map.html",
	styleUrls: [
		"./map.common.css", 
		"./map.css",
	],
})
export class MapComponent implements OnInit {
	mapView: MapView;
	defaultZoom = 7;
	defaultLocation = {
		lat: 14.599512,
		lon: 120.984222
		// lat: -33.86,
		// lon: 151.20
	}
	location;
	vehicleList = [];
	vehicleListFull = [];
	isLoading = false;
	searchKey: string = '';
	runningTypes;
	commTypes;
	activationTypes;
	dueDateTypes;

	constructor(private clientVehicleService: ClientVehicleService
			, private routerExtensions: RouterExtensions) {
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
		alert('Error occurs upon loading data');
	}

	ngOnInit() {
		this.location = this.defaultLocation;
	}

	ngOnChanges(changes) {

	}

	goBack() {
		this.routerExtensions.back();
	}

	loadMapVehicles(mapView, vehicles) {
		if (!mapView || !vehicles) {
			console.log('no data ' + vehicles.length);
			return;
		}

		mapView.removeAllMarkers(); // Remove all existing markers
		let index = 0;
		let _marker: Marker;
		_.forEach(vehicles, function(vehicle) {
			if (vehicle.apiData && vehicle.apiData.latestData) {
				_marker = new Marker();
				_marker.position = Position.positionFromLatLng(vehicle.apiData.latestData.lat, vehicle.apiData.latestData.lon);
				_marker.title = vehicle.clientName;
				_marker.snippet = vehicle.vehicleName + ' -- ' + vehicle.apiData.activationStatus.status;
				_marker.userData = { index: index };

				mapView.addMarker(_marker);
				index++;
			}
		});

		const lastVehicle = vehicles[(index > 0) ? index - 1 : index];
		if (lastVehicle && lastVehicle.apiData && lastVehicle.apiData.latestData) {
			this.location.lat = lastVehicle.apiData.latestData.lat;
			this.location.lon = lastVehicle.apiData.latestData.lon;
		}
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
		this.loadMapVehicles(this.mapView, this.vehicleList);
	}

	onMapReady(event) {
		console.log('Map Ready');
		this.mapView = event.object;
		this.loadList(this.mapView);
	}

	loadList(mapView: MapView) {
		this.isLoading = true;
		this.clientVehicleService.getList((error, response) => {
			this.isLoading = false;
			if (error) {
				this.checkIfTokenExpired(error);
			} else if (response && response.data) {
				this.vehicleListFull = (response) ? response.data : [];
				this.vehicleList = this.filterList(this.searchKey);
				this.loadMapVehicles(mapView, this.vehicleList);
			}
		});
	}

	refreshList() {
		if (!this.isLoading) {
			this.loadList(this.mapView);
		}
	}
}