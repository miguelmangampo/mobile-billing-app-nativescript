"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var utilities_1 = require("../../utils/utilities");
var moment = require("moment");
var VehicleListComponent = (function () {
    function VehicleListComponent(router) {
        this.router = router;
        this.isSearching = false;
    }
    VehicleListComponent.prototype.formatDateString = function (date) {
        return utilities_1.formatDate(date);
    };
    VehicleListComponent.prototype.formatDateTimeToString = function (date) {
        return utilities_1.formatDatetime(date);
    };
    VehicleListComponent.prototype.getDueStatusClass = function (deadlineDate) {
        var dueDate = moment(this.formatDateString(deadlineDate));
        var dateNow = moment(this.formatDateString(moment()));
        var daysDiff = dueDate.diff(dateNow, 'days', true);
        var status = "";
        if (deadlineDate == null) {
            status = 'DONE';
        }
        else if (!dueDate.isValid()) {
            status = 'BELOW';
        }
        else if (daysDiff < 0) {
            status = 'BELOW';
        }
        else if (daysDiff == 0) {
            status = 'TODAY';
        }
        return status;
    };
    VehicleListComponent.prototype.getMobilityStatus = function (mobility) {
        return (mobility) ? mobility.status : '';
    };
    VehicleListComponent.prototype.getMobilityUpdatedDate = function (mobility) {
        return (mobility) ? this.formatDateTimeToString(mobility.updatedAt) : '';
    };
    VehicleListComponent.prototype.device_Clicked = function (data) {
        var serviceEntID = (data && data.apiData) ? data.apiData.id : 0;
        var navigationExtras = {
            queryParams: {
                serviceEntityID: serviceEntID,
                clientName: data.clientName,
                vehicleName: data.vehicleName
            }
        };
        this.router.navigate(["/deviceDetails"], navigationExtras);
    };
    VehicleListComponent.prototype.payments_Clicked = function (data) {
        var navigationExtras = {
            queryParams: {
                clientVehicleID: data.clientVehicleID,
                clientName: data.clientName,
                vehicleName: data.vehicleName
            }
        };
        this.router.navigate(["/paymentList"], navigationExtras);
    };
    VehicleListComponent.prototype.ngOnInit = function () {
    };
    VehicleListComponent.prototype.ngOnChanges = function (changes) {
    };
    return VehicleListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], VehicleListComponent.prototype, "vehicleList", void 0);
VehicleListComponent = __decorate([
    core_1.Component({
        selector: "VehicleListComponent",
        providers: [],
        templateUrl: "components/vehicle-list-component/vehicle-list-component.html",
        styleUrls: [
            "components/vehicle-list-component/vehicle-list-component.common.css",
            "components/vehicle-list-component/vehicle-list-component.css",
        ],
    }),
    __metadata("design:paramtypes", [router_1.Router])
], VehicleListComponent);
exports.VehicleListComponent = VehicleListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVoaWNsZS1saXN0LWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZWhpY2xlLWxpc3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRjtBQUMzRiwwQ0FBMkQ7QUFDM0QsbURBQW1FO0FBRW5FLCtCQUFpQztBQW9CakMsSUFBYSxvQkFBb0I7SUFJaEMsOEJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRmxDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBSXBCLENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBSTtRQUNwQixNQUFNLENBQUMsc0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQscURBQXNCLEdBQXRCLFVBQXVCLElBQUk7UUFDMUIsTUFBTSxDQUFDLDBCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixZQUFZO1FBQzdCLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDakIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELGdEQUFpQixHQUFqQixVQUFrQixRQUFRO1FBQ3pCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxxREFBc0IsR0FBdEIsVUFBdUIsUUFBUTtRQUM5QixNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxRSxDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFlLElBQUk7UUFDbEIsSUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLGdCQUFnQixHQUFxQjtZQUN4QyxXQUFXLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLFlBQVk7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzdCO1NBQ0QsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBSTtRQUNwQixJQUFJLGdCQUFnQixHQUFxQjtZQUN4QyxXQUFXLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUM3QjtTQUNELENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLE9BQU87SUFFbkIsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXZFRCxJQXVFQztBQXRFUztJQUFSLFlBQUssRUFBRTs7eURBQWE7QUFEVCxvQkFBb0I7SUFsQmhDLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFNBQVMsRUFBRSxFQUFFO1FBRWIsV0FBVyxFQUFFLCtEQUErRDtRQUM1RSxTQUFTLEVBQUU7WUFDVixxRUFBcUU7WUFDckUsOERBQThEO1NBQzlEO0tBU0QsQ0FBQztxQ0FLMkIsZUFBTTtHQUp0QixvQkFBb0IsQ0F1RWhDO0FBdkVZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUsIGZvcm1hdERhdGV0aW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxpdGllc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJWZWhpY2xlTGlzdENvbXBvbmVudFwiLFxyXG5cdHByb3ZpZGVyczogW10sXHJcblx0XHJcblx0dGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy92ZWhpY2xlLWxpc3QtY29tcG9uZW50L3ZlaGljbGUtbGlzdC1jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCJjb21wb25lbnRzL3ZlaGljbGUtbGlzdC1jb21wb25lbnQvdmVoaWNsZS1saXN0LWNvbXBvbmVudC5jb21tb24uY3NzXCIsIFxyXG5cdFx0XCJjb21wb25lbnRzL3ZlaGljbGUtbGlzdC1jb21wb25lbnQvdmVoaWNsZS1saXN0LWNvbXBvbmVudC5jc3NcIixcclxuXHRdLFxyXG5cdFxyXG5cdC8qXHJcblx0dGVtcGxhdGVVcmw6IFwiLi92ZWhpY2xlLWxpc3QtY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFtcclxuXHRcdFwiLi92ZWhpY2xlLWxpc3QtY29tcG9uZW50LmNvbW1vbi5jc3NcIiwgXHJcblx0XHRcIi4vdmVoaWNsZS1saXN0LWNvbXBvbmVudC5jc3NcIixcclxuXHRdLFxyXG5cdCovXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWZWhpY2xlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgdmVoaWNsZUxpc3Q7XHRcclxuXHRpc1NlYXJjaGluZyA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcblxyXG5cdH1cclxuXHJcblx0Zm9ybWF0RGF0ZVN0cmluZyhkYXRlKSB7XHJcblx0XHRyZXR1cm4gZm9ybWF0RGF0ZShkYXRlKTtcclxuXHR9XHJcblxyXG5cdGZvcm1hdERhdGVUaW1lVG9TdHJpbmcoZGF0ZSkge1xyXG5cdFx0cmV0dXJuIGZvcm1hdERhdGV0aW1lKGRhdGUpO1xyXG5cdH1cclxuXHJcblx0Z2V0RHVlU3RhdHVzQ2xhc3MoZGVhZGxpbmVEYXRlKSB7XHJcblx0XHRjb25zdCBkdWVEYXRlID0gbW9tZW50KHRoaXMuZm9ybWF0RGF0ZVN0cmluZyhkZWFkbGluZURhdGUpKTtcclxuXHRcdGNvbnN0IGRhdGVOb3cgPSBtb21lbnQodGhpcy5mb3JtYXREYXRlU3RyaW5nKG1vbWVudCgpKSk7XHJcblx0XHRjb25zdCBkYXlzRGlmZiA9IGR1ZURhdGUuZGlmZihkYXRlTm93LCAnZGF5cycsIHRydWUpO1xyXG5cdFx0bGV0IHN0YXR1cyA9IFwiXCI7XHJcblx0XHRpZiAoZGVhZGxpbmVEYXRlID09IG51bGwpIHtcclxuXHRcdFx0c3RhdHVzID0gJ0RPTkUnO1xyXG5cdFx0fSBlbHNlIGlmICghZHVlRGF0ZS5pc1ZhbGlkKCkpIHtcclxuXHRcdFx0c3RhdHVzID0gJ0JFTE9XJztcclxuXHRcdH0gZWxzZSBpZiAoZGF5c0RpZmYgPCAwKSB7XHJcblx0XHRcdHN0YXR1cyA9ICdCRUxPVyc7XHJcblx0XHR9IGVsc2UgaWYgKGRheXNEaWZmID09IDApIHtcclxuXHRcdFx0c3RhdHVzID0gJ1RPREFZJztcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdGF0dXM7XHJcblx0fVxyXG5cclxuXHRnZXRNb2JpbGl0eVN0YXR1cyhtb2JpbGl0eSkge1xyXG5cdFx0cmV0dXJuIChtb2JpbGl0eSkgPyBtb2JpbGl0eS5zdGF0dXMgOiAnJztcclxuXHR9XHJcblxyXG5cdGdldE1vYmlsaXR5VXBkYXRlZERhdGUobW9iaWxpdHkpIHtcclxuXHRcdHJldHVybiAobW9iaWxpdHkpID8gdGhpcy5mb3JtYXREYXRlVGltZVRvU3RyaW5nKG1vYmlsaXR5LnVwZGF0ZWRBdCkgOiAnJztcclxuXHR9XHJcblxyXG5cdGRldmljZV9DbGlja2VkKGRhdGEpIHtcclxuXHRcdGNvbnN0IHNlcnZpY2VFbnRJRCA9IChkYXRhICYmIGRhdGEuYXBpRGF0YSkgPyBkYXRhLmFwaURhdGEuaWQgOiAwOyBcclxuXHRcdGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG5cdFx0XHRxdWVyeVBhcmFtczogeyBcclxuXHRcdFx0XHRzZXJ2aWNlRW50aXR5SUQ6IHNlcnZpY2VFbnRJRCxcclxuXHRcdFx0XHRjbGllbnROYW1lOiBkYXRhLmNsaWVudE5hbWUsXHJcblx0XHRcdFx0dmVoaWNsZU5hbWU6IGRhdGEudmVoaWNsZU5hbWVcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kZXZpY2VEZXRhaWxzXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuXHR9XHJcblxyXG5cdHBheW1lbnRzX0NsaWNrZWQoZGF0YSkge1xyXG5cdFx0bGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcblx0XHRcdHF1ZXJ5UGFyYW1zOiB7IFxyXG5cdFx0XHRcdGNsaWVudFZlaGljbGVJRDogZGF0YS5jbGllbnRWZWhpY2xlSUQsXHJcblx0XHRcdFx0Y2xpZW50TmFtZTogZGF0YS5jbGllbnROYW1lLFxyXG5cdFx0XHRcdHZlaGljbGVOYW1lOiBkYXRhLnZlaGljbGVOYW1lXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvcGF5bWVudExpc3RcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblxyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG5cclxuXHR9XHJcbn0iXX0=