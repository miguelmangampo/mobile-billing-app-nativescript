"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var payments_service_1 = require("../../shared/payments/payments.service");
var utilities_1 = require("../../utils/utilities");
var router_2 = require("nativescript-angular/router");
var PaymentListComponent = (function () {
    function PaymentListComponent(route, paymentsService, routerExtensions) {
        var _this = this;
        this.route = route;
        this.paymentsService = paymentsService;
        this.routerExtensions = routerExtensions;
        this.isLoading = false;
        this.totalPaidAmt = 0;
        this.totalRecords = 0;
        this.paymentList = [];
        this.route.queryParams.subscribe(function (params) {
            _this.clientVehicleID = params["clientVehicleID"];
            _this.clientName = params["clientName"];
            _this.vehicleName = params["vehicleName"];
        });
    }
    PaymentListComponent.prototype.checkIfTokenExpired = function (error) {
        if (utilities_1.isTokenExpired(error)) {
            alert('Token has been expired');
            this.routerExtensions.back();
            return;
        }
        alert('Error occurs upon loading data');
    };
    PaymentListComponent.prototype.loadList = function () {
        var _this = this;
        this.isLoading = true;
        this.paymentsService.getList(this.clientVehicleID, function (error, response) {
            _this.isLoading = false;
            if (error) {
                _this.checkIfTokenExpired(error);
            }
            _this.paymentList = (response) ? response.list : [];
            _this.totalPaidAmt = (response) ? response.totalPaidAmt : 0;
            _this.totalRecords = (response) ? response.totalRecords : 0;
        });
    };
    PaymentListComponent.prototype.ngOnInit = function () {
        this.loadList();
    };
    PaymentListComponent.prototype.refreshList = function () {
        if (!this.isLoading) {
            this.loadList();
        }
    };
    PaymentListComponent.prototype.formatDateString = function (date) {
        return utilities_1.formatDate(date);
    };
    PaymentListComponent.prototype.isPaymentCancelled = function (payment) {
        if (payment.isCancelled == 1) {
            return { isCancelled: true, status: 'cancelled' };
        }
        return { isCancelled: false, status: '' };
    };
    PaymentListComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return PaymentListComponent;
}());
PaymentListComponent = __decorate([
    core_1.Component({
        selector: "paymentList",
        providers: [payments_service_1.PaymentsService],
        styleUrls: [
            "pages/payment-list/payment-list-common.css",
            "pages/payment-list/payment-list.css"
        ],
        templateUrl: "pages/payment-list/payment-list.html",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        payments_service_1.PaymentsService,
        router_2.RouterExtensions])
], PaymentListComponent);
exports.PaymentListComponent = PaymentListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBheW1lbnQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMENBQWlEO0FBQ2pELDJFQUF5RTtBQUN6RSxtREFBbUU7QUFDbkUsc0RBQStEO0FBb0IvRCxJQUFhLG9CQUFvQjtJQVNoQyw4QkFBb0IsS0FBcUIsRUFDN0IsZUFBZ0MsRUFDaEMsZ0JBQWtDO1FBRjlDLGlCQVFDO1FBUm1CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzdCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUDlDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFLaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN0QyxLQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pELEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGtEQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLDBCQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxLQUFLLEVBQUUsUUFBUTtZQUNsRSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ25ELEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDRixDQUFDO0lBRUQsK0NBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFDcEIsTUFBTSxDQUFDLHNCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGlEQUFrQixHQUFsQixVQUFtQixPQUFPO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQTtRQUNsRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUE7SUFDMUMsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQWpFRCxJQWlFQztBQWpFWSxvQkFBb0I7SUFsQmhDLGdCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsYUFBYTtRQUN2QixTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1FBRTVCLFNBQVMsRUFBRTtZQUNWLDRDQUE0QztZQUM1QyxxQ0FBcUM7U0FDckM7UUFDRCxXQUFXLEVBQUUsc0NBQXNDO0tBU25ELENBQUM7cUNBVTBCLHVCQUFjO1FBQ1osa0NBQWU7UUFDZCx5QkFBZ0I7R0FYbEMsb0JBQW9CLENBaUVoQztBQWpFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBheW1lbnRzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcGF5bWVudHMvcGF5bWVudHMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlLCBpc1Rva2VuRXhwaXJlZCB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcInBheW1lbnRMaXN0XCIsXHJcblx0cHJvdmlkZXJzOiBbUGF5bWVudHNTZXJ2aWNlXSxcclxuXHRcclxuXHRzdHlsZVVybHM6IFtcclxuXHRcdFwicGFnZXMvcGF5bWVudC1saXN0L3BheW1lbnQtbGlzdC1jb21tb24uY3NzXCIsIFxyXG5cdFx0XCJwYWdlcy9wYXltZW50LWxpc3QvcGF5bWVudC1saXN0LmNzc1wiXHJcblx0XSxcclxuXHR0ZW1wbGF0ZVVybDogXCJwYWdlcy9wYXltZW50LWxpc3QvcGF5bWVudC1saXN0Lmh0bWxcIixcclxuXHRcclxuXHQvKlxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCIuL3BheW1lbnQtbGlzdC1jb21tb24uY3NzXCIsIFxyXG5cdFx0XCIuL3BheW1lbnQtbGlzdC5jc3NcIlxyXG5cdF0sXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9wYXltZW50LWxpc3QuaHRtbFwiLFxyXG5cdCovXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXltZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0Y2xpZW50VmVoaWNsZUlEO1xyXG5cdGNsaWVudE5hbWU6IHN0cmluZztcclxuXHR2ZWhpY2xlTmFtZTogc3RyaW5nO1xyXG5cdGlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdHRvdGFsUGFpZEFtdCA9IDA7XHJcblx0dG90YWxSZWNvcmRzID0gMDtcclxuXHRwYXltZW50TGlzdCA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG5cdFx0XHQsIHByaXZhdGUgcGF5bWVudHNTZXJ2aWNlOiBQYXltZW50c1NlcnZpY2VcclxuXHRcdFx0LCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuXHRcdHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcblx0XHRcdHRoaXMuY2xpZW50VmVoaWNsZUlEID0gcGFyYW1zW1wiY2xpZW50VmVoaWNsZUlEXCJdO1xyXG5cdFx0XHR0aGlzLmNsaWVudE5hbWUgPSBwYXJhbXNbXCJjbGllbnROYW1lXCJdO1xyXG5cdFx0XHR0aGlzLnZlaGljbGVOYW1lID0gcGFyYW1zW1widmVoaWNsZU5hbWVcIl07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNoZWNrSWZUb2tlbkV4cGlyZWQoZXJyb3IpIHtcclxuXHRcdGlmIChpc1Rva2VuRXhwaXJlZChlcnJvcikpIHtcclxuXHRcdFx0YWxlcnQoJ1Rva2VuIGhhcyBiZWVuIGV4cGlyZWQnKTtcclxuXHRcdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0YWxlcnQoJ0Vycm9yIG9jY3VycyB1cG9uIGxvYWRpbmcgZGF0YScpO1xyXG5cdH1cclxuXHJcblx0bG9hZExpc3QoKSB7XHJcblx0XHR0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnBheW1lbnRzU2VydmljZS5nZXRMaXN0KHRoaXMuY2xpZW50VmVoaWNsZUlELCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tJZlRva2VuRXhwaXJlZChlcnJvcik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wYXltZW50TGlzdCA9IChyZXNwb25zZSkgPyByZXNwb25zZS5saXN0IDogW107XHJcblx0XHRcdHRoaXMudG90YWxQYWlkQW10ID0gKHJlc3BvbnNlKSA/IHJlc3BvbnNlLnRvdGFsUGFpZEFtdCA6IDA7XHJcblx0XHRcdHRoaXMudG90YWxSZWNvcmRzID0gKHJlc3BvbnNlKSA/IHJlc3BvbnNlLnRvdGFsUmVjb3JkcyA6IDA7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5sb2FkTGlzdCgpO1xyXG5cdH1cclxuXHJcblx0cmVmcmVzaExpc3QoKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNMb2FkaW5nKSB7XHJcblx0XHRcdHRoaXMubG9hZExpc3QoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZvcm1hdERhdGVTdHJpbmcoZGF0ZSkge1xyXG5cdFx0cmV0dXJuIGZvcm1hdERhdGUoZGF0ZSk7XHJcblx0fVxyXG5cclxuXHRpc1BheW1lbnRDYW5jZWxsZWQocGF5bWVudCkge1xyXG5cdFx0aWYgKHBheW1lbnQuaXNDYW5jZWxsZWQgPT0gMSkge1xyXG5cdFx0XHRyZXR1cm4geyBpc0NhbmNlbGxlZDogdHJ1ZSwgc3RhdHVzOiAnY2FuY2VsbGVkJyB9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geyBpc0NhbmNlbGxlZDogZmFsc2UsIHN0YXR1czogJycgfVxyXG5cdH1cclxuXHJcblx0Z29CYWNrKCkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcbn0iXX0=