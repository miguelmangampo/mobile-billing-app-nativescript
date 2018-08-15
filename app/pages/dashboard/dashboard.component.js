"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var clientVehicle_service_1 = require("../../shared/clientVehicle/clientVehicle.service");
var company_service_1 = require("../../shared/company/company.service");
var utilities_1 = require("../../utils/utilities");
var config_1 = require("../../shared/config");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var application_1 = require("application");
var platform_1 = require("platform");
var application = require("application");
var dialogs = require("ui/dialogs");
var _ = require("lodash");
var moment = require("moment");
var DashboardComponent = (function () {
    function DashboardComponent(clientVehicleService, router, routerExtensions, companyService) {
        this.clientVehicleService = clientVehicleService;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.companyService = companyService;
        this.vehicleListFull = [];
        this.vehicleList = [];
        this.isLoading = false;
        this.searchKey = '';
        this.runningTypes = config_1.Config.filters.types.running;
        this.commTypes = config_1.Config.filters.types.comm;
        this.activationTypes = config_1.Config.filters.types.activation;
        this.dueDateTypes = config_1.Config.filters.types.dueDate;
    }
    DashboardComponent.prototype.checkIfTokenExpired = function (error) {
        if (utilities_1.isTokenExpired(error)) {
            alert('Token has been expired');
            this.routerExtensions.back();
            return;
        }
        alert('Error occurs upon loading list');
    };
    DashboardComponent.prototype.loadVehicleList = function () {
        var _this = this;
        this.isLoading = true;
        this.clientVehicleService.getList(function (error, response) {
            _this.isLoading = false;
            if (error) {
                _this.checkIfTokenExpired(error);
            }
            _this.vehicleListFull = (response) ? response.data : [];
            _this.vehicleList = _this.filterList(_this.searchKey);
        });
    };
    DashboardComponent.prototype.filterList = function (searchKey) {
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
    DashboardComponent.prototype.onSearchChanged = function (args) {
        var searchBar = args.object;
        this.searchKey = searchBar.text;
        this.vehicleList = this.filterList(this.searchKey);
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (platform_1.isAndroid) {
            application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
                if (_this.router.isActive("/dashboard", false)) {
                    data.cancel = true; // prevents default back button behavior
                    _this.signOff();
                }
            });
        }
        this.loadCompanyList();
        this.loadVehicleList();
    };
    DashboardComponent.prototype.loadCompanyList = function () {
        this.companyService.getList(function (errorCom, responseCom) {
            config_1.Config.companyList = (responseCom) ? responseCom.list : [];
        });
    };
    DashboardComponent.prototype.signOff = function () {
        var _this = this;
        dialogs.confirm({
            title: "Sign-off",
            message: "Are you sure you want to sign-off?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: ""
        }).then(function (result) {
            if (result) {
                _this.routerExtensions.back();
            }
        });
    };
    DashboardComponent.prototype.refreshList = function () {
        if (!this.isLoading) {
            this.loadVehicleList();
        }
    };
    DashboardComponent.prototype.showMap = function () {
        this.router.navigate(["/mapDevices"]);
    };
    DashboardComponent.prototype.showSettings = function () {
        this.router.navigate(["/settings"]);
    };
    DashboardComponent.prototype.showFilters = function () {
        this.router.navigate(["/filters"]);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: "dashboard",
        providers: [clientVehicle_service_1.ClientVehicleService, company_service_1.CompanyService],
        styleUrls: [
            "pages/dashboard/dashboard.common.css",
            "pages/dashboard/dashboard.css"
        ],
        templateUrl: "pages/dashboard/dashboard.html",
    }),
    __metadata("design:paramtypes", [clientVehicle_service_1.ClientVehicleService,
        router_1.Router,
        router_2.RouterExtensions,
        company_service_1.CompanyService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMEZBQXdGO0FBQ3hGLHdFQUFzRTtBQUN0RSxtREFBK0U7QUFDL0UsOENBQTZDO0FBRTdDLDBDQUF5QztBQUN6QyxzREFBK0Q7QUFDL0QsMkNBQXNGO0FBQ3RGLHFDQUFxQztBQUVyQyx5Q0FBMkM7QUFDM0Msb0NBQXNDO0FBQ3RDLDBCQUE0QjtBQUM1QiwrQkFBaUM7QUFxQmpDLElBQWEsa0JBQWtCO0lBVTlCLDRCQUFvQixvQkFBMEMsRUFDbEQsTUFBYyxFQUNkLGdCQUFrQyxFQUNsQyxjQUE4QjtRQUh0Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVoxQyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFVdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDbEQsQ0FBQztJQUVELGdEQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQ3hCLEVB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QVcsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQS9JRCxJQStJQztBQS9JWSxrQkFBa0I7SUFuQjlCLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixTQUFTLEVBQUUsQ0FBQyw0Q0FBb0IsRUFBRSxnQ0FBYyxDQUFDO1FBRWpELFNBQVMsRUFBRTtZQUNWLHNDQUFzQztZQUN0QywrQkFBK0I7U0FDL0I7UUFDRCxXQUFXLEVBQUUsZ0NBQWdDO0tBVTdDLENBQUM7cUNBV3lDLDRDQUFvQjtRQUMxQyxlQUFNO1FBQ0kseUJBQWdCO1FBQ2xCLGdDQUFjO0dBYjlCLGtCQUFrQixDQStJOUI7QUEvSVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENsaWVudFZlaGljbGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jbGllbnRWZWhpY2xlL2NsaWVudFZlaGljbGUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb21wYW55U2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29tcGFueS9jb21wYW55LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgbWVyZ2VBcnJheSwgaXNUb2tlbkV4cGlyZWQsIGZvcm1hdERhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbGl0aWVzXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlnXCI7XHJcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJkYXNoYm9hcmRcIixcclxuXHRwcm92aWRlcnM6IFtDbGllbnRWZWhpY2xlU2VydmljZSwgQ29tcGFueVNlcnZpY2VdLFxyXG5cdFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCJwYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbW1vbi5jc3NcIiwgXHJcblx0XHRcInBhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY3NzXCJcclxuXHRdLFxyXG5cdHRlbXBsYXRlVXJsOiBcInBhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuaHRtbFwiLFxyXG5cdFxyXG5cdC8qXHJcblx0c3R5bGVVcmxzOiBbXHJcblx0XHRcIi4vZGFzaGJvYXJkLmNvbW1vbi5jc3NcIiwgXHJcblx0XHRcIi4vZGFzaGJvYXJkLmNzc1wiXHJcblx0XSxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2Rhc2hib2FyZC5odG1sXCIsXHJcblx0Ki9cclxuXHRcclxufSlcclxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0dmVoaWNsZUxpc3RGdWxsID0gW107XHJcblx0dmVoaWNsZUxpc3QgPSBbXTtcclxuXHRpc0xvYWRpbmcgPSBmYWxzZTtcclxuXHRzZWFyY2hLZXk6IHN0cmluZyA9ICcnO1xyXG5cdHJ1bm5pbmdUeXBlcztcclxuXHRjb21tVHlwZXM7XHJcblx0YWN0aXZhdGlvblR5cGVzO1xyXG5cdGR1ZURhdGVUeXBlcztcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRWZWhpY2xlU2VydmljZTogQ2xpZW50VmVoaWNsZVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcblx0XHRcdCwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXHJcblx0XHRcdCwgcHJpdmF0ZSBjb21wYW55U2VydmljZTogQ29tcGFueVNlcnZpY2UpIHtcclxuXHRcdHRoaXMucnVubmluZ1R5cGVzID0gQ29uZmlnLmZpbHRlcnMudHlwZXMucnVubmluZztcclxuXHRcdHRoaXMuY29tbVR5cGVzID0gQ29uZmlnLmZpbHRlcnMudHlwZXMuY29tbTtcclxuXHRcdHRoaXMuYWN0aXZhdGlvblR5cGVzID0gQ29uZmlnLmZpbHRlcnMudHlwZXMuYWN0aXZhdGlvbjtcclxuXHRcdHRoaXMuZHVlRGF0ZVR5cGVzID0gQ29uZmlnLmZpbHRlcnMudHlwZXMuZHVlRGF0ZTtcclxuXHR9XHJcblxyXG5cdGNoZWNrSWZUb2tlbkV4cGlyZWQoZXJyb3IpIHtcclxuXHRcdGlmIChpc1Rva2VuRXhwaXJlZChlcnJvcikpIHtcclxuXHRcdFx0YWxlcnQoJ1Rva2VuIGhhcyBiZWVuIGV4cGlyZWQnKTtcclxuXHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0YWxlcnQoJ0Vycm9yIG9jY3VycyB1cG9uIGxvYWRpbmcgbGlzdCcpO1xyXG5cdH1cclxuXHJcblx0bG9hZFZlaGljbGVMaXN0KCkge1xyXG5cdFx0dGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5jbGllbnRWZWhpY2xlU2VydmljZS5nZXRMaXN0KChlcnJvciwgcmVzcG9uc2UpID0+IHtcclxuXHRcdFx0dGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYgKGVycm9yKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja0lmVG9rZW5FeHBpcmVkKGVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnZlaGljbGVMaXN0RnVsbCA9IChyZXNwb25zZSkgPyByZXNwb25zZS5kYXRhIDogW107XHJcblx0XHRcdHRoaXMudmVoaWNsZUxpc3QgPSB0aGlzLmZpbHRlckxpc3QodGhpcy5zZWFyY2hLZXkpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmaWx0ZXJMaXN0KHNlYXJjaEtleTogc3RyaW5nKSB7XHJcblx0XHQvLyBGaWx0ZXIgZm9yIGRldmljZSBzdGF0dXNcclxuXHRcdGxldCBsaXN0ID0gXy5maWx0ZXIodGhpcy52ZWhpY2xlTGlzdEZ1bGwsICh2ZWhpY2xlKSA9PiB7IFxyXG5cdFx0XHRyZXR1cm4gKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLnJ1bm5pbmdTdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5ydW5uaW5nID09IHRoaXMucnVubmluZ1R5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEucnVubmluZ1N0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMucnVubmluZykpXHJcblx0XHRcdFx0JiYgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmNvbW1TdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5jb21tID09IHRoaXMuY29tbVR5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEuY29tbVN0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMuY29tbSkpXHJcblx0XHRcdFx0JiYgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmFjdGl2YXRpb25TdGF0dXMpICYmIChDb25maWcuZmlsdGVycy5hY3RpdmF0aW9uID09IHRoaXMuYWN0aXZhdGlvblR5cGVzLkFMTCB8fCB2ZWhpY2xlLmFwaURhdGEuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXMgPT0gQ29uZmlnLmZpbHRlcnMuYWN0aXZhdGlvbikpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdC8vIEFkZGluZyB2ZWhpY2xlIHdpdGggbm8gZGV2aWNlIGRhdGFcclxuXHRcdF8uZm9yRWFjaCh0aGlzLnZlaGljbGVMaXN0RnVsbCwgKHZlaGljbGUpID0+IHtcclxuXHRcdFx0aWYgKCF2ZWhpY2xlLmFwaURhdGFcclxuXHRcdFx0XHR8fCAhdmVoaWNsZS5hcGlEYXRhLnJ1bm5pbmdTdGF0dXNcclxuXHRcdFx0XHR8fCAhdmVoaWNsZS5hcGlEYXRhLmNvbW1TdGF0dXMpIHtcclxuXHRcdFx0XHRsaXN0LnB1c2godmVoaWNsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEZpbHRlciBmb3IgY2xpZW50IGFuZCB2ZWhpY2xlIG5hbWVcclxuXHRcdGxpc3QgPSBfLmZpbHRlcihsaXN0LCAodmVoaWNsZSkgPT4geyBcclxuXHRcdFx0cmV0dXJuICgodmVoaWNsZS5jbGllbnROYW1lKSAmJiAodmVoaWNsZS5jbGllbnROYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkpID49IDApKVxyXG5cdFx0XHRcdHx8ICgodmVoaWNsZS52ZWhpY2xlTmFtZSkgJiYgKHZlaGljbGUudmVoaWNsZU5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaEtleS50cmltKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkpXHJcblx0XHRcdFx0Ly8gfHwgKCh2ZWhpY2xlLmFwaURhdGEgJiYgdmVoaWNsZS5hcGlEYXRhLmFjdGl2YXRpb25TdGF0dXMpICYmICh2ZWhpY2xlLmFwaURhdGEuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaEtleS50cmltKCkudG9Mb3dlckNhc2UoKSkgPj0gMCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gRm9yIGR1ZSBkYXRlc1xyXG5cdFx0aWYgKENvbmZpZy5maWx0ZXJzLmR1ZURhdGUgIT0gdGhpcy5kdWVEYXRlVHlwZXMuQUxMKSB7XHJcblx0XHRcdGNvbnN0IGZpbHRlcmVkTGlzdCA9IGxpc3Q7XHJcblx0XHRcdGxpc3QgPSBbXTtcclxuXHRcdFx0Xy5mb3JFYWNoKGZpbHRlcmVkTGlzdCwgKHZlaGljbGUpID0+IHtcclxuXHRcdFx0XHRjb25zdCBkdWVEYXRlID0gbW9tZW50KGZvcm1hdERhdGUodmVoaWNsZS5kZWFkbGluZURhdGUpKTtcclxuXHRcdFx0XHRjb25zdCBkYXRlTm93ID0gbW9tZW50KGZvcm1hdERhdGUobW9tZW50KCkpKTtcclxuXHRcdFx0XHRjb25zdCBkYXlzRGlmZiA9IGR1ZURhdGUuZGlmZihkYXRlTm93LCAnZGF5cycsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRpZiAoQ29uZmlnLmZpbHRlcnMuZHVlRGF0ZSA9PSB0aGlzLmR1ZURhdGVUeXBlcy5EVUVfVE9EQVkgJiYgZGF5c0RpZmYgPT0gMCkge1xyXG5cdFx0XHRcdFx0bGlzdC5wdXNoKHZlaGljbGUpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoQ29uZmlnLmZpbHRlcnMuZHVlRGF0ZSA9PSB0aGlzLmR1ZURhdGVUeXBlcy5XSVRIX1BBU1RfRFVFUyAmJiBkYXlzRGlmZiA8IDApIHtcclxuXHRcdFx0XHRcdGxpc3QucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKENvbmZpZy5maWx0ZXJzLmR1ZURhdGUgPT0gdGhpcy5kdWVEYXRlVHlwZXMuTk9UX0RVRSAmJiBkYXlzRGlmZiA+IDApIHtcclxuXHRcdFx0XHRcdGxpc3QucHVzaCh2ZWhpY2xlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBsaXN0O1xyXG5cdH1cclxuXHJcblx0b25TZWFyY2hDaGFuZ2VkKGFyZ3MpIHtcclxuXHRcdGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG5cdFx0dGhpcy5zZWFyY2hLZXkgPSBzZWFyY2hCYXIudGV4dDtcclxuXHRcdHRoaXMudmVoaWNsZUxpc3QgPSB0aGlzLmZpbHRlckxpc3QodGhpcy5zZWFyY2hLZXkpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZiAoaXNBbmRyb2lkKSB7XHJcblx0XHRcdGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2Rhc2hib2FyZFwiLCBmYWxzZSkpIHtcclxuXHRcdFx0XHRcdGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG5cdFx0XHRcdFx0dGhpcy5zaWduT2ZmKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdHRoaXMubG9hZENvbXBhbnlMaXN0KCk7XHJcblx0XHR0aGlzLmxvYWRWZWhpY2xlTGlzdCgpO1xyXG5cdH1cclxuXHJcblx0bG9hZENvbXBhbnlMaXN0KCkge1xyXG5cdFx0dGhpcy5jb21wYW55U2VydmljZS5nZXRMaXN0KChlcnJvckNvbSwgcmVzcG9uc2VDb20pID0+IHtcclxuXHRcdFx0Q29uZmlnLmNvbXBhbnlMaXN0ID0gKHJlc3BvbnNlQ29tKSA/IHJlc3BvbnNlQ29tLmxpc3QgOiBbXTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c2lnbk9mZigpIHtcclxuXHRcdGRpYWxvZ3MuY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiBcIlNpZ24tb2ZmXCIsXHJcblx0XHRcdG1lc3NhZ2U6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHNpZ24tb2ZmP1wiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcblx0XHRcdGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuXHRcdFx0bmV1dHJhbEJ1dHRvblRleHQ6IFwiXCJcclxuXHRcdH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuXHRcdFx0aWYgKHJlc3VsdCkge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVmcmVzaExpc3QoKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNMb2FkaW5nKSB7XHJcblx0XHRcdHRoaXMubG9hZFZlaGljbGVMaXN0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWFwKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21hcERldmljZXNcIl0pO1xyXG5cdH1cclxuXHJcblx0c2hvd1NldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NldHRpbmdzXCJdKTtcclxuXHR9XHJcblxyXG5cdHNob3dGaWx0ZXJzKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2ZpbHRlcnNcIl0pO1xyXG5cdH1cclxufSJdfQ==