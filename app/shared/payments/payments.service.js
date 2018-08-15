"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var config_1 = require("../config");
var PaymentsService = (function () {
    function PaymentsService(http) {
        this.http = http;
        this.httpService = new http_service_1.HttpService(http);
    }
    PaymentsService.prototype.getList = function (clientVehicleID, callback) {
        var endpoint = 'payments-by-page/history'
            + '?clientVehicleID=' + clientVehicleID
            + '&pageNumber=1&pageSize=' + config_1.Config.maxPage;
        return this.httpService.get(endpoint)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return PaymentsService;
}());
PaymentsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBheW1lbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFDckMsc0NBQTJDO0FBQzNDLGdEQUE4QztBQUM5QyxvQ0FBbUM7QUFHbkMsSUFBYSxlQUFlO0lBRzNCLHlCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLGVBQWUsRUFBRSxRQUFrQjtRQUMxQyxJQUFNLFFBQVEsR0FBRywwQkFBMEI7Y0FDdEMsbUJBQW1CLEdBQUcsZUFBZTtjQUNyQyx5QkFBeUIsR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDcEMsU0FBUyxDQUNULFVBQUMsUUFBUSxJQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNDLFVBQUMsS0FBSyxJQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBbEJZLGVBQWU7SUFEM0IsaUJBQVUsRUFBRTtxQ0FJYyxXQUFJO0dBSGxCLGVBQWUsQ0FrQjNCO0FBbEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cCB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gXCIuLi9odHRwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGF5bWVudHNTZXJ2aWNlIHtcclxuXHRodHRwU2VydmljZTogSHR0cFNlcnZpY2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xyXG5cdFx0dGhpcy5odHRwU2VydmljZSA9IG5ldyBIdHRwU2VydmljZShodHRwKTtcclxuXHR9XHJcblxyXG5cdGdldExpc3QoY2xpZW50VmVoaWNsZUlELCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGNvbnN0IGVuZHBvaW50ID0gJ3BheW1lbnRzLWJ5LXBhZ2UvaGlzdG9yeSdcclxuXHRcdFx0XHRcdCsgJz9jbGllbnRWZWhpY2xlSUQ9JyArIGNsaWVudFZlaGljbGVJRFxyXG5cdFx0XHRcdFx0KyAnJnBhZ2VOdW1iZXI9MSZwYWdlU2l6ZT0nICsgQ29uZmlnLm1heFBhZ2U7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGVuZHBvaW50KVxyXG5cdFx0LnN1YnNjcmliZShcclxuXHRcdFx0KHJlc3BvbnNlKSA9PiB7IGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTsgfSxcclxuXHRcdFx0KGVycm9yKSA9PiB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgfVxyXG5cdFx0KTtcclxuXHR9XHJcbn0iXX0=