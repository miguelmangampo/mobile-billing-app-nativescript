"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var utilities_1 = require("../../utils/utilities");
var serviceEntity_service_1 = require("../../shared/serviceEntity/serviceEntity.service");
var dialogs = require("ui/dialogs");
var DeviceDetailsComponent = (function () {
    function DeviceDetailsComponent(route, serviceEntityService, routerExtensions) {
        var _this = this;
        this.route = route;
        this.serviceEntityService = serviceEntityService;
        this.routerExtensions = routerExtensions;
        this.isLoading = false;
        this.activationText = '';
        this.route.queryParams.subscribe(function (params) {
            _this.serviceEntityID = params["serviceEntityID"];
            _this.clientName = params["clientName"];
            _this.vehicleName = params["vehicleName"];
        });
    }
    DeviceDetailsComponent.prototype.formatDatetimeString = function (date) {
        return utilities_1.formatDatetime(date);
    };
    DeviceDetailsComponent.prototype.checkIfTokenExpired = function (error) {
        if (utilities_1.isTokenExpired(error)) {
            alert('Token has been expired');
            this.routerExtensions.back();
            return;
        }
        alert('Error occurs upon loading data');
    };
    DeviceDetailsComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.serviceEntityService.getOne(this.serviceEntityID, function (error, response) {
            _this.isLoading = false;
            if (error) {
                _this.checkIfTokenExpired(error);
            }
            _this.deviceDetails = (response) ? response : null;
            _this.runningStatus = (_this.deviceDetails && _this.deviceDetails.runningStatus)
                ? _this.deviceDetails.runningStatus.status : '';
            _this.commStatus = (_this.deviceDetails && _this.deviceDetails.commStatus)
                ? _this.deviceDetails.commStatus.status : '';
            _this.activationStatus = (_this.deviceDetails && _this.deviceDetails.activationStatus)
                ? _this.deviceDetails.activationStatus.status : '';
            _this.activationText = _this.getActionButtonText();
            if (_this.activationText != 'CANCEL_RESERVATION') {
                _this.activationText += _this.isReserve() ? ' (RESERVE)' : '';
            }
        });
    };
    DeviceDetailsComponent.prototype.isReserve = function () {
        return (this.commStatus === 'NOTCOMM');
    };
    DeviceDetailsComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    DeviceDetailsComponent.prototype.refreshData = function () {
        if (!this.isLoading) {
            this.loadData();
        }
    };
    DeviceDetailsComponent.prototype.getActionButtonText = function () {
        if (!this.deviceDetails.activationStatus) {
            return '';
        }
        var actionText = '';
        if (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'INACTIVE') {
            actionText = 'ACTIVATE';
        }
        else if (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'ACTIVE') {
            actionText = 'DEACTIVATE';
        }
        else if ((this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'DEACTIVATING')
            || (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'WAITING_TO_DEACT')
            || (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'ACTIVATING')
            || (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'WAITING_TO_ACT')) {
            actionText = 'CANCEL';
        }
        else if ((this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'RESERVING_TO_ACTIVATE')
            || (this.deviceDetails.activationStatus.status.trim().toUpperCase() == 'RESERVING_TO_DEACTIVATE')) {
            actionText = 'CANCEL_RESERVATION';
        }
        return actionText;
    };
    DeviceDetailsComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    DeviceDetailsComponent.prototype.activation = function () {
        var _this = this;
        var activationStatus = this.getActionButtonText();
        dialogs.confirm({
            title: activationStatus,
            message: 'Are you sure you want to ' + activationStatus + '?',
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: ""
        }).then(function (result) {
            if (result) {
                var reservation = _this.isReserve();
                _this.isLoading = true;
                _this.serviceEntityService.activation(_this.serviceEntityID, activationStatus, reservation, function (error, response) {
                    if (error) {
                        _this.isLoading = false;
                        alert('Error upon changing activation status.');
                        return;
                    }
                    _this.loadData();
                });
            }
        });
    };
    return DeviceDetailsComponent;
}());
DeviceDetailsComponent = __decorate([
    core_1.Component({
        selector: "deviceDetails",
        providers: [serviceEntity_service_1.ServiceEntityService],
        templateUrl: "pages/device-details/device-details.html",
        styleUrls: [
            "pages/device-details/device-details-common.css",
            "pages/device-details/device-details.css"
        ]
        /*
        templateUrl: "./device-details.html",
        styleUrls: [
            "./device-details-common.css",
            "./device-details.css"
        ]
        */
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        serviceEntity_service_1.ServiceEntityService,
        router_2.RouterExtensions])
], DeviceDetailsComponent);
exports.DeviceDetailsComponent = DeviceDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV2aWNlLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUFpRDtBQUNqRCxzREFBK0Q7QUFDL0QsbURBQXVFO0FBQ3ZFLDBGQUF3RjtBQUN4RixvQ0FBc0M7QUFvQnRDLElBQWEsc0JBQXNCO0lBWWxDLGdDQUFvQixLQUFxQixFQUM3QixvQkFBMEMsRUFDMUMsZ0JBQWtDO1FBRjlDLGlCQVFDO1FBUm1CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVQ5QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBUzNCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDdEMsS0FBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNqRCxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxxREFBb0IsR0FBcEIsVUFBcUIsSUFBSTtRQUN4QixNQUFNLENBQUMsMEJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsb0RBQW1CLEdBQW5CLFVBQW9CLEtBQUs7UUFDeEIsRUFBRSxDQUFDLENBQUMsMEJBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFD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R0FkbEMsc0JBQXNCLENBcUhsQztBQXJIWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGZvcm1hdERhdGV0aW1lLCBpc1Rva2VuRXhwaXJlZCB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgU2VydmljZUVudGl0eVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VFbnRpdHkvc2VydmljZUVudGl0eS5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcImRldmljZURldGFpbHNcIixcclxuXHRwcm92aWRlcnM6IFtTZXJ2aWNlRW50aXR5U2VydmljZV0sXHJcblx0XHJcblx0dGVtcGxhdGVVcmw6IFwicGFnZXMvZGV2aWNlLWRldGFpbHMvZGV2aWNlLWRldGFpbHMuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCJwYWdlcy9kZXZpY2UtZGV0YWlscy9kZXZpY2UtZGV0YWlscy1jb21tb24uY3NzXCIsIFxyXG5cdFx0XCJwYWdlcy9kZXZpY2UtZGV0YWlscy9kZXZpY2UtZGV0YWlscy5jc3NcIlxyXG5cdF1cclxuXHRcclxuXHQvKlxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vZGV2aWNlLWRldGFpbHMuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCIuL2RldmljZS1kZXRhaWxzLWNvbW1vbi5jc3NcIiwgXHJcblx0XHRcIi4vZGV2aWNlLWRldGFpbHMuY3NzXCJcclxuXHRdXHJcblx0Ki9cclxufSlcclxuZXhwb3J0IGNsYXNzIERldmljZURldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHNlcnZpY2VFbnRpdHlJRDtcclxuXHRjbGllbnROYW1lOiBzdHJpbmc7XHJcblx0dmVoaWNsZU5hbWU6IHN0cmluZztcclxuXHRkZXZpY2VEZXRhaWxzO1xyXG5cdGlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdGFjdGl2YXRpb25UZXh0OiBzdHJpbmcgPSAnJztcclxuXHJcblx0cnVubmluZ1N0YXR1czogc3RyaW5nO1xyXG5cdGNvbW1TdGF0dXM6IHN0cmluZztcclxuXHRhY3RpdmF0aW9uU3RhdHVzOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcblx0XHRcdCwgcHJpdmF0ZSBzZXJ2aWNlRW50aXR5U2VydmljZTogU2VydmljZUVudGl0eVNlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuXHRcdHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdHRoaXMuc2VydmljZUVudGl0eUlEID0gcGFyYW1zW1wic2VydmljZUVudGl0eUlEXCJdO1xyXG5cdFx0XHR0aGlzLmNsaWVudE5hbWUgPSBwYXJhbXNbXCJjbGllbnROYW1lXCJdO1xyXG5cdFx0XHR0aGlzLnZlaGljbGVOYW1lID0gcGFyYW1zW1widmVoaWNsZU5hbWVcIl07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZvcm1hdERhdGV0aW1lU3RyaW5nKGRhdGUpIHtcclxuXHRcdHJldHVybiBmb3JtYXREYXRldGltZShkYXRlKTtcclxuXHR9XHJcblxyXG5cdGNoZWNrSWZUb2tlbkV4cGlyZWQoZXJyb3IpIHtcclxuXHRcdGlmIChpc1Rva2VuRXhwaXJlZChlcnJvcikpIHtcclxuXHRcdFx0YWxlcnQoJ1Rva2VuIGhhcyBiZWVuIGV4cGlyZWQnKTtcclxuXHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0YWxlcnQoJ0Vycm9yIG9jY3VycyB1cG9uIGxvYWRpbmcgZGF0YScpO1xyXG5cdH1cclxuXHJcblx0bG9hZERhdGEoKSB7XHJcblx0XHR0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnNlcnZpY2VFbnRpdHlTZXJ2aWNlLmdldE9uZSh0aGlzLnNlcnZpY2VFbnRpdHlJRCwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xyXG5cdFx0XHR0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHR0aGlzLmNoZWNrSWZUb2tlbkV4cGlyZWQoZXJyb3IpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZGV2aWNlRGV0YWlscyA9IChyZXNwb25zZSkgPyByZXNwb25zZSA6IG51bGw7XHJcblx0XHRcdHRoaXMucnVubmluZ1N0YXR1cyA9ICh0aGlzLmRldmljZURldGFpbHMgJiYgdGhpcy5kZXZpY2VEZXRhaWxzLnJ1bm5pbmdTdGF0dXMpIFxyXG5cdFx0XHRcdFx0XHRcdD8gdGhpcy5kZXZpY2VEZXRhaWxzLnJ1bm5pbmdTdGF0dXMuc3RhdHVzIDogJyc7XHJcblx0XHRcdHRoaXMuY29tbVN0YXR1cyA9ICh0aGlzLmRldmljZURldGFpbHMgJiYgdGhpcy5kZXZpY2VEZXRhaWxzLmNvbW1TdGF0dXMpIFxyXG5cdFx0XHRcdFx0XHRcdD8gdGhpcy5kZXZpY2VEZXRhaWxzLmNvbW1TdGF0dXMuc3RhdHVzIDogJyc7XHJcblx0XHRcdHRoaXMuYWN0aXZhdGlvblN0YXR1cyA9ICh0aGlzLmRldmljZURldGFpbHMgJiYgdGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMpIFxyXG5cdFx0XHRcdFx0XHRcdD8gdGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzIDogJyc7XHJcblxyXG5cdFx0XHR0aGlzLmFjdGl2YXRpb25UZXh0ID0gdGhpcy5nZXRBY3Rpb25CdXR0b25UZXh0KCk7XHJcblx0XHRcdGlmICh0aGlzLmFjdGl2YXRpb25UZXh0ICE9ICdDQU5DRUxfUkVTRVJWQVRJT04nKSB7XHJcblx0XHRcdFx0dGhpcy5hY3RpdmF0aW9uVGV4dCArPSB0aGlzLmlzUmVzZXJ2ZSgpID8gJyAoUkVTRVJWRSknIDogJyc7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aXNSZXNlcnZlKCkge1xyXG5cdFx0cmV0dXJuICh0aGlzLmNvbW1TdGF0dXMgPT09ICdOT1RDT01NJyk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMubG9hZERhdGEoKTtcclxuXHR9XHJcblxyXG5cdHJlZnJlc2hEYXRhKCkge1xyXG5cdFx0aWYgKCF0aGlzLmlzTG9hZGluZykge1xyXG5cdFx0XHR0aGlzLmxvYWREYXRhKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25CdXR0b25UZXh0KCkge1xyXG5cdFx0aWYgKCF0aGlzLmRldmljZURldGFpbHMuYWN0aXZhdGlvblN0YXR1cykgeyByZXR1cm4gJyc7IH1cclxuXHRcdGxldCBhY3Rpb25UZXh0ID0gJyc7XHJcblx0XHRpZiAodGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzLnRyaW0oKS50b1VwcGVyQ2FzZSgpID09ICdJTkFDVElWRScpIHtcclxuXHRcdFx0YWN0aW9uVGV4dCA9ICdBQ1RJVkFURSc7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuZGV2aWNlRGV0YWlscy5hY3RpdmF0aW9uU3RhdHVzLnN0YXR1cy50cmltKCkudG9VcHBlckNhc2UoKSA9PSAnQUNUSVZFJykge1xyXG5cdFx0XHRhY3Rpb25UZXh0ID0gJ0RFQUNUSVZBVEUnO1xyXG5cdFx0fSBlbHNlIGlmICgodGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzLnRyaW0oKS50b1VwcGVyQ2FzZSgpID09ICdERUFDVElWQVRJTkcnKVxyXG5cdFx0XHR8fCAodGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzLnRyaW0oKS50b1VwcGVyQ2FzZSgpID09ICdXQUlUSU5HX1RPX0RFQUNUJylcclxuXHRcdFx0fHwgKHRoaXMuZGV2aWNlRGV0YWlscy5hY3RpdmF0aW9uU3RhdHVzLnN0YXR1cy50cmltKCkudG9VcHBlckNhc2UoKSA9PSAnQUNUSVZBVElORycpXHJcblx0XHRcdHx8ICh0aGlzLmRldmljZURldGFpbHMuYWN0aXZhdGlvblN0YXR1cy5zdGF0dXMudHJpbSgpLnRvVXBwZXJDYXNlKCkgPT0gJ1dBSVRJTkdfVE9fQUNUJykpIHtcclxuXHRcdFx0YWN0aW9uVGV4dCA9ICdDQU5DRUwnO1xyXG5cdFx0fSBlbHNlIGlmICgodGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzLnRyaW0oKS50b1VwcGVyQ2FzZSgpID09ICdSRVNFUlZJTkdfVE9fQUNUSVZBVEUnKVxyXG5cdFx0XHR8fCAodGhpcy5kZXZpY2VEZXRhaWxzLmFjdGl2YXRpb25TdGF0dXMuc3RhdHVzLnRyaW0oKS50b1VwcGVyQ2FzZSgpID09ICdSRVNFUlZJTkdfVE9fREVBQ1RJVkFURScpKSB7XHJcblx0XHRcdGFjdGlvblRleHQgPSAnQ0FOQ0VMX1JFU0VSVkFUSU9OJztcclxuXHRcdH1cclxuXHRcdHJldHVybiBhY3Rpb25UZXh0O1xyXG5cdH1cclxuXHJcblx0Z29CYWNrKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cdGFjdGl2YXRpb24oKSB7XHJcblx0XHRjb25zdCBhY3RpdmF0aW9uU3RhdHVzID0gdGhpcy5nZXRBY3Rpb25CdXR0b25UZXh0KCk7XHJcblx0XHRkaWFsb2dzLmNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogYWN0aXZhdGlvblN0YXR1cyxcclxuXHRcdFx0bWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byAnICsgYWN0aXZhdGlvblN0YXR1cyArICc/JyxcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCIsXHJcblx0XHRcdG5ldXRyYWxCdXR0b25UZXh0OiBcIlwiXHJcblx0XHR9KS50aGVuKHJlc3VsdCA9PiB7XHJcblx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRjb25zdCByZXNlcnZhdGlvbiA9IHRoaXMuaXNSZXNlcnZlKCk7XHJcblx0XHRcdFx0dGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuc2VydmljZUVudGl0eVNlcnZpY2UuYWN0aXZhdGlvbih0aGlzLnNlcnZpY2VFbnRpdHlJRCwgYWN0aXZhdGlvblN0YXR1cywgcmVzZXJ2YXRpb24sIChlcnJvciwgcmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRhbGVydCgnRXJyb3IgdXBvbiBjaGFuZ2luZyBhY3RpdmF0aW9uIHN0YXR1cy4nKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5sb2FkRGF0YSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn0iXX0=