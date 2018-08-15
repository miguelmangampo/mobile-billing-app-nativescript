"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var clientVehicle_service_1 = require("../../shared/clientVehicle/clientVehicle.service");
var config_1 = require("../../shared/config");
var router_1 = require("nativescript-angular/router");
var utilities_1 = require("../../utils/utilities");
var _ = require("lodash");
var moment = require("moment");
var MapComponent = (function () {
    function MapComponent(clientVehicleService, routerExtensions) {
        this.clientVehicleService = clientVehicleService;
        this.routerExtensions = routerExtensions;
        this.defaultZoom = 7;
        this.defaultLocation = {
            lat: 14.599512,
            lon: 120.984222
            // lat: -33.86,
            // lon: 151.20
        };
        this.vehicleList = [];
        this.vehicleListFull = [];
        this.isLoading = false;
        this.searchKey = '';
        this.runningTypes = config_1.Config.filters.types.running;
        this.commTypes = config_1.Config.filters.types.comm;
        this.activationTypes = config_1.Config.filters.types.activation;
        this.dueDateTypes = config_1.Config.filters.types.dueDate;
    }
    MapComponent.prototype.checkIfTokenExpired = function (error) {
        if (utilities_1.isTokenExpired(error)) {
            alert('Token has been expired');
            this.routerExtensions.back();
            return;
        }
        alert('Error occurs upon loading data');
    };
    MapComponent.prototype.ngOnInit = function () {
        this.location = this.defaultLocation;
    };
    MapComponent.prototype.ngOnChanges = function (changes) {
    };
    MapComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    MapComponent.prototype.loadMapVehicles = function (mapView, vehicles) {
        if (!mapView || !vehicles) {
            console.log('no data ' + vehicles.length);
            return;
        }
        mapView.removeAllMarkers(); // Remove all existing markers
        var index = 0;
        var _marker;
        _.forEach(vehicles, function (vehicle) {
            if (vehicle.apiData && vehicle.apiData.latestData) {
                _marker = new nativescript_google_maps_sdk_1.Marker();
                _marker.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(vehicle.apiData.latestData.lat, vehicle.apiData.latestData.lon);
                _marker.title = vehicle.clientName;
                _marker.snippet = vehicle.vehicleName + ' -- ' + vehicle.apiData.activationStatus.status;
                _marker.userData = { index: index };
                mapView.addMarker(_marker);
                index++;
            }
        });
        var lastVehicle = vehicles[(index > 0) ? index - 1 : index];
        if (lastVehicle && lastVehicle.apiData && lastVehicle.apiData.latestData) {
            this.location.lat = lastVehicle.apiData.latestData.lat;
            this.location.lon = lastVehicle.apiData.latestData.lon;
        }
    };
    MapComponent.prototype.filterList = function (searchKey) {
        var _this = this;
        // Filter for device status
        var list = _.filter(this.vehicleListFull, function (vehicle) {
            return ((vehicle.apiData && vehicle.apiData.runningStatus) && (config_1.Config.filters.running == _this.runningTypes.ALL || vehicle.apiData.runningStatus.status == config_1.Config.filters.running))
                && ((vehicle.apiData && vehicle.apiData.commStatus) && (config_1.Config.filters.comm == _this.commTypes.ALL || vehicle.apiData.commStatus.status == config_1.Config.filters.comm))
                && ((vehicle.apiData && vehicle.apiData.activationStatus) && (config_1.Config.filters.activation == _this.activationTypes.ALL || vehicle.apiData.activationStatus.status == config_1.Config.filters.activation));
        });
        // Adding vehicle with no device data
        _.forEach(this.vehicleListFull, function (vehicle) {
            if (!vehicle.apiData
                || !vehicle.apiData.runningStatus
                || !vehicle.apiData.commStatus) {
                list.push(vehicle);
            }
        });
        // Filter for client and vehicle name
        list = _.filter(list, function (vehicle) {
            return ((vehicle.clientName) && (vehicle.clientName.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0))
                || ((vehicle.vehicleName) && (vehicle.vehicleName.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0));
            // || ((vehicle.apiData && vehicle.apiData.activationStatus) && (vehicle.apiData.activationStatus.status.toLowerCase().indexOf(searchKey.trim().toLowerCase()) >= 0));
        });
        // For due dates
        if (config_1.Config.filters.dueDate != this.dueDateTypes.ALL) {
            var filteredList = list;
            list = [];
            _.forEach(filteredList, function (vehicle) {
                var dueDate = moment(utilities_1.formatDate(vehicle.deadlineDate));
                var dateNow = moment(utilities_1.formatDate(moment()));
                var daysDiff = dueDate.diff(dateNow, 'days', true);
                if (config_1.Config.filters.dueDate == _this.dueDateTypes.DUE_TODAY && daysDiff == 0) {
                    list.push(vehicle);
                }
                else if (config_1.Config.filters.dueDate == _this.dueDateTypes.WITH_PAST_DUES && daysDiff < 0) {
                    list.push(vehicle);
                }
                else if (config_1.Config.filters.dueDate == _this.dueDateTypes.NOT_DUE && daysDiff > 0) {
                    list.push(vehicle);
                }
            });
        }
        return list;
    };
    MapComponent.prototype.onSearchChanged = function (args) {
        var searchBar = args.object;
        this.searchKey = searchBar.text;
        this.vehicleList = this.filterList(this.searchKey);
        this.loadMapVehicles(this.mapView, this.vehicleList);
    };
    MapComponent.prototype.onMapReady = function (event) {
        console.log('Map Ready');
        this.mapView = event.object;
        this.loadList(this.mapView);
    };
    MapComponent.prototype.loadList = function (mapView) {
        var _this = this;
        this.isLoading = true;
        this.clientVehicleService.getList(function (error, response) {
            _this.isLoading = false;
            if (error) {
                _this.checkIfTokenExpired(error);
            }
            else if (response && response.data) {
                _this.vehicleListFull = (response) ? response.data : [];
                _this.vehicleList = _this.filterList(_this.searchKey);
                _this.loadMapVehicles(mapView, _this.vehicleList);
            }
        });
    };
    MapComponent.prototype.refreshList = function () {
        if (!this.isLoading) {
            this.loadList(this.mapView);
        }
    };
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        selector: "MapComponent",
        providers: [clientVehicle_service_1.ClientVehicleService],
        templateUrl: "pages/map/map.html",
        styleUrls: [
            "pages/map/map.common.css",
            "pages/map/map.css",
        ],
    }),
    __metadata("design:paramtypes", [clientVehicle_service_1.ClientVehicleService,
        router_1.RouterExtensions])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsNkVBQXlFO0FBQ3pFLDBGQUF3RjtBQUN4Riw4Q0FBNkM7QUFFN0Msc0RBQStEO0FBQy9ELG1EQUFtRTtBQUNuRSwwQkFBNEI7QUFDNUIsK0JBQWlDO0FBb0JqQyxJQUFhLFlBQVk7SUFtQnhCLHNCQUFvQixvQkFBMEMsRUFDbEQsZ0JBQWtDO1FBRDFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDbEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWxCOUMsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsb0JBQWUsR0FBRztZQUNqQixHQUFHLEVBQUUsU0FBUztZQUNkLEdBQUcsRUFBRSxVQUFVO1lBQ2YsZUFBZTtZQUNmLGNBQWM7U0FDZCxDQUFBO1FBRUQsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBUXRCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2xELENBQUM7SUFFRCwwQ0FBbUIsR0FBbkIsVUFBb0IsS0FBSztRQUN4QixFQUFFLENBQUMsQ0FBQywwQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFD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QUMxQixtQkFBbUI7U0FDbkI7S0FTRCxDQUFDO3FDQW9CeUMsNENBQW9CO1FBQ2hDLHlCQUFnQjtHQXBCbEMsWUFBWSxDQTJKeEI7QUEzSlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTWFwVmlldywgTWFya2VyLCBQb3NpdGlvbiB9IGZyb20gJ25hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGsnO1xyXG5pbXBvcnQgeyBDbGllbnRWZWhpY2xlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY2xpZW50VmVoaWNsZS9jbGllbnRWZWhpY2xlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgaXNUb2tlbkV4cGlyZWQsIGZvcm1hdERhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbGl0aWVzXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJNYXBDb21wb25lbnRcIixcclxuXHRwcm92aWRlcnM6IFtDbGllbnRWZWhpY2xlU2VydmljZV0sXHJcblx0XHJcblx0dGVtcGxhdGVVcmw6IFwicGFnZXMvbWFwL21hcC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbXHJcblx0XHRcInBhZ2VzL21hcC9tYXAuY29tbW9uLmNzc1wiLCBcclxuXHRcdFwicGFnZXMvbWFwL21hcC5jc3NcIixcclxuXHRdLFxyXG5cdFxyXG5cdC8qXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9tYXAuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCIuL21hcC5jb21tb24uY3NzXCIsIFxyXG5cdFx0XCIuL21hcC5jc3NcIixcclxuXHRdLFxyXG5cdCovXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdG1hcFZpZXc6IE1hcFZpZXc7XHJcblx0ZGVmYXVsdFpvb20gPSA3O1xyXG5cdGRlZmF1bHRMb2NhdGlvbiA9IHtcclxuXHRcdGxhdDogMTQuNTk5NTEyLFxyXG5cdFx0bG9uOiAxMjAuOTg0MjIyXHJcblx0XHQvLyBsYXQ6IC0zMy44NixcclxuXHRcdC8vIGxvbjogMTUxLjIwXHJcblx0fVxyXG5cdGxvY2F0aW9uO1xyXG5cdHZlaGljbGVMaXN0ID0gW107XHJcblx0dmVoaWNsZUxpc3RGdWxsID0gW107XHJcblx0aXNMb2FkaW5nID0gZmFsc2U7XHJcblx0c2VhcmNoS2V5OiBzdHJpbmcgPSAnJztcclxuXHRydW5uaW5nVHlwZXM7XHJcblx0Y29tbVR5cGVzO1xyXG5cdGFjdGl2YXRpb25UeXBlcztcclxuXHRkdWVEYXRlVHlwZXM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50VmVoaWNsZVNlcnZpY2U6IENsaWVudFZlaGljbGVTZXJ2aWNlXHJcblx0XHRcdCwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcblx0XHR0aGlzLnJ1bm5pbmdUeXBlcyA9IENvbmZpZy5maWx0ZXJzLnR5cGVzLnJ1bm5pbmc7XHJcblx0XHR0aGlzLmNvbW1UeXBlcyA9IENvbmZpZy5maWx0ZXJzLnR5cGVzLmNvbW07XHJcblx0XHR0aGlzLmFjdGl2YXRpb25UeXBlcyA9IENvbmZpZy5maWx0ZXJzLnR5cGVzLmFjdGl2YXRpb247XHJcblx0XHR0aGlzLmR1ZURhdGVUeXBlcyA9IENvbmZpZy5maWx0ZXJzLnR5cGVzLmR1ZURhdGU7XHJcblx0fVxyXG5cclxuXHRjaGVja0lmVG9rZW5FeHBpcmVkKGVycm9yKSB7XHJcblx0XHRpZiAoaXNUb2tlbkV4cGlyZWQoZXJyb3IpKSB7XHJcblx0XHRcdGFsZXJ0KCdUb2tlbiBoYXMgYmVlbiBleHBpcmVkJyk7XHJcblx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGFsZXJ0KCdFcnJvciBvY2N1cnMgdXBvbiBsb2FkaW5nIGRhdGEnKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5sb2NhdGlvbiA9IHRoaXMuZGVmYXVsdExvY2F0aW9uO1xyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG5cclxuXHR9XHJcblxyXG5cdGdvQmFjaygpIHtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuXHRsb2FkTWFwVmVoaWNsZXMobWFwVmlldywgdmVoaWNsZXMpIHtcclxuXHRcdGlmICghbWFwVmlldyB8fCAhdmVoaWNsZXMpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ25vIGRhdGEgJyArIHZlaGljbGVzLmxlbmd0aCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRtYXBWaWV3LnJlbW92ZUFsbE1hcmtlcnMoKTsgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBtYXJrZXJzXHJcblx0XHRsZXQgaW5kZXggPSAwO1xyXG5cdFx0bGV0IF9tYXJrZXI6IE1hcmtlcjtcclxuXHRcdF8uZm9yRWFjaCh2ZWhpY2xlcywgZnVuY3Rpb24odmVoaWNsZSkge1xyXG5cdFx0XHRpZiAodmVoaWNsZS5hcGlEYXRhICYmIHZlaGljbGUuYXBpRGF0YS5sYXRlc3REYXRhKSB7XHJcblx0XHRcdFx0X21hcmtlciA9IG5ldyBNYXJrZXIoKTtcclxuXHRcdFx0XHRfbWFya2VyLnBvc2l0aW9uID0gUG9zaXRpb24ucG9zaXRpb25Gcm9tTGF0TG5nKHZlaGljbGUuYXBpRGF0YS5sYXRlc3REYXRhLmxhdCwgdmVoaWNsZS5hcGlEYXRhLmxhdGVzdERhdGEubG9uKTtcclxuXHRcdFx0XHRfbWFya2VyLnRpdGxlID0gdmVoaWNsZS5jbGllbnROYW1lO1xyXG5cdFx0XHRcdF9tYXJrZXIuc25pcHBldCA9IHZlaGljbGUudmVoaWNsZU5hbWUgKyAnIC0tICcgKyB2ZWhpY2xlLmFwaURhdGEuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXM7XHJcblx0XHRcdFx0X21hcmtlci51c2VyRGF0YSA9IHsgaW5kZXg6IGluZGV4IH07XHJcblxyXG5cdFx0XHRcdG1hcFZpZXcuYWRkTWFya2VyKF9tYXJrZXIpO1xyXG5cdFx0XHRcdGluZGV4Kys7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGxhc3RWZWhpY2xlID0gdmVoaWNsZXNbKGluZGV4ID4gMCkgPyBpbmRleCAtIDEgOiBpbmRleF07XHJcblx0XHRpZiAobGFzdFZlaGljbGUgJiYgbGFzdFZlaGljbGUuYXBpRGF0YSAmJiBsYXN0VmVoaWNsZS5hcGlEYXRhLmxhdGVzdERhdGEpIHtcclxuXHRcdFx0dGhpcy5sb2NhdGlvbi5sYXQgPSBsYXN0VmVoaWNsZS5hcGlEYXRhLmxhdGVzdERhdGEubGF0O1xyXG5cdFx0XHR0aGlzLmxvY2F0aW9uLmxvbiA9IGxhc3RWZWhpY2xlLmFwaURhdGEubGF0ZXN0RGF0YS5sb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmaWx0ZXJMaXN0KHNlYXJjaEtleTogc3RyaW5nKSB7XHJcblx0XHQvLyBGaWx0ZXIgZm9yIGRldmljZSBzdGF0dXNcclxuXHRcdGxldCBsaXN0ID0gXy5maWx0ZXIodGhpcy52ZWhpY2xlTGlzdEZ1bGwsICh2ZWhpY2xlKSA9PiB7IFxyXG5cdFx0XHRyZXR1cm4gKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLnJ1bm5pbmdTdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5ydW5uaW5nID09IHRoaXMucnVubmluZ1R5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEucnVubmluZ1N0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMucnVubmluZykpXHJcblx0XHRcdFx0JiYgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmNvbW1TdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5jb21tID09IHRoaXMuY29tbVR5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEuY29tbVN0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMuY29tbSkpXHJcblx0XHRcdFx0JiYgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmFjdGl2YXRpb25TdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5hY3RpdmF0aW9uID09IHRoaXMuYWN0aXZhdGlvblR5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMuYWN0aXZhdGlvbikpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdC8vIEFkZGluZyB2ZWhpY2xlIHdpdGggbm8gZGV2aWNlIGRhdGFcclxuXHRcdF8uZm9yRWFjaCh0aGlzLnZlaGljbGVMaXN0RnVsbCwgKHZlaGljbGUpID0+IHtcclxuXHRcdFx0aWYgKCF2ZWhpY2xlLmFwaURhdGFcclxuXHRcdFx0XHR8fCAhdmVoaWNsZS5hcGlEYXRhLnJ1bm5pbmdTdGF0dXNcclxuXHRcdFx0XHR8fCAhdmVoaWNsZS5hcGlEYXRhLmNvbW1TdGF0dXMpIHtcclxuXHRcdFx0XHRsaXN0LnB1c2godmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEZpbHRlciBmb3IgY2xpZW50IGFuZCB2ZWhpY2xlIG5hbWVcclxuXHRcdGxpc3QgPSBfLmZpbHRlcihsaXN0LCAodmVoaWNsZSkgPT4geyBcclxuXHRcdFx0cmV0dXJuICgodmVoaWNsZS5jbGllbnROYW1lKSAmJiAodmVoaWNsZS5jbGllbnROYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkpID49IDApKVxyXG5cdFx0XHRcdHx8ICgodmVoaWNsZS52ZWhpY2xlTmFtZSkgJiYgKHZlaGljbGUudmVoaWNsZU5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaEtleS50cmltKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkpXHJcblx0XHRcdFx0Ly8gfHwgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmFjdGl2YXRpb25TdGF0dXMpICYmICh2ZWhpY2xlLmFwaURhdGEuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaEtleS50cmltKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gRm9yIGR1ZSBkYXRlc1xyXG5cdFx0aWYgKENvbmZpZy5maWx0ZXJzLmR1ZURhdGUgIT0gdGhpcy5kdWVEYXRlVHlwZXMuQUxMKSB7XHJcblx0XHRcdGNvbnN0IGZpbHRlcmVkTGlzdCA9IGxpc3Q7XHJcblx0XHRcdGxpc3QgPSBbXTtcclxuXHRcdFx0Xy5mb3JFYWNoKGZpbHRlcmVkTGlzdCwgKHZlaGljbGUpID0+IHtcclxuXHRcdFx0XHRjb25zdCBkdWVEYXRlID0gbW9tZW50KGZvcm1hdERhdGUodmVoaWNsZS5kZWFkbGluZURhdGUpKTtcclxuXHRcdFx0XHRjb25zdCBkYXRlTm93ID0gbW9tZW50KGZvcm1hdERhdGUobW9tZW50KCkpKTtcclxuXHRcdFx0XHRjb25zdCBkYXlzRGlmZiA9IGR1ZURhdGUuZGlmZihkYXRlTm93LCAnZGF5cycsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRpZiAoQ29uZmlnLmZpbHRlcnMuZHVlRGF0ZSA9PSB0aGlzLmR1ZURhdGVUeXBlcy5EVUVfVE9EQVkgJiYgZGF5c0RpZmYgPT0gMCkge1xyXG5cdFx0XHRcdFx0bGlzdC5wdXNoKHZlaGljbGUpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoQ29uZmlnLmZpbHRlcnMuZHVlRGF0ZSA9PSB0aGlzLmR1ZURhdGVUeXBlcy5XSVRIX1BBU1RfRFVFUyAmJiBkYXlzRGlmZiA8IDApIHtcclxuXHRcdFx0XHRcdGxpc3QucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKENvbmZpZy5maWx0ZXJzLmR1ZURhdGUgPT0gdGhpcy5kdWVEYXRlVHlwZXMuTk9UX0RVRSAmJiBkYXlzRGlmZiA+IDApIHtcclxuXHRcdFx0XHRcdGxpc3QucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBsaXN0O1xyXG5cdH1cclxuXHJcblx0b25TZWFyY2hDaGFuZ2VkKGFyZ3MpIHtcclxuXHRcdGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG5cdFx0dGhpcy5zZWFyY2hLZXkgPSBzZWFyY2hCYXIudGV4dDsgXHJcblx0XHR0aGlzLnZlaGljbGVMaXN0ID0gdGhpcy5maWx0ZXJMaXN0KHRoaXMuc2VhcmNoS2V5KTtcclxuXHRcdHRoaXMubG9hZE1hcFZlaGljbGVzKHRoaXMubWFwVmlldywgdGhpcy52ZWhpY2xlTGlzdCk7XHJcblx0fVxyXG5cclxuXHRvbk1hcFJlYWR5KGV2ZW50KSB7XHJcblx0XHRjb25zb2xlLmxvZygnTWFwIFJlYWR5Jyk7XHJcblx0XHR0aGlzLm1hcFZpZXcgPSBldmVudC5vYmplY3Q7XHJcblx0XHR0aGlzLmxvYWRMaXN0KHRoaXMubWFwVmlldyk7XHJcblx0fVxyXG5cclxuXHRsb2FkTGlzdChtYXBWaWV3OiBNYXBWaWV3KSB7XHJcblx0XHR0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLmNsaWVudFZlaGljbGVTZXJ2aWNlLmdldExpc3QoKGVycm9yLCByZXNwb25zZSkgPT4ge1xyXG5cdFx0XHR0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrSWZUb2tlbkV4cGlyZWQoZXJyb3IpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcclxuXHRcdFx0XHR0aGlzLnZlaGljbGVMaXN0RnVsbCA9IChyZXNwb25zZSkgPyByZXNwb25zZS5kYXRhIDogW107XHJcblx0XHRcdFx0dGhpcy52ZWhpY2xlTGlzdCA9IHRoaXMuZmlsdGVyTGlzdCh0aGlzLnNlYXJjaEtleSk7XHJcblx0XHRcdFx0dGhpcy5sb2FkTWFwVmVoaWNsZXMobWFwVmlldywgdGhpcy52ZWhpY2xlTGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVmcmVzaExpc3QoKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNMb2FkaW5nKSB7XHJcblx0XHRcdHRoaXMubG9hZExpc3QodGhpcy5tYXBWaWV3KTtcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=