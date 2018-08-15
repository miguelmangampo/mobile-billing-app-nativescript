"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var config_1 = require("../config");
var ClientVehicleService = (function () {
    function ClientVehicleService(http) {
        this.http = http;
        this.httpService = new http_service_1.HttpService(http);
        this.user = config_1.Config.user;
        this.societyID = config_1.Config.societyID;
        this.maxPage = config_1.Config.maxPage;
    }
    ClientVehicleService.prototype.getList = function (callback) {
        var endpoint = config_1.Config.user + '/api/societies/'
            + config_1.Config.societyID + '/client-vehicle-summary'
            + '?pageNumber=1&pageSize=' + config_1.Config.maxPage
            + '&companyID=' + config_1.Config.companyID;
        return this.httpService.get(endpoint)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return ClientVehicleService;
}());
ClientVehicleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ClientVehicleService);
exports.ClientVehicleService = ClientVehicleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50VmVoaWNsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50VmVoaWNsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFDO0FBQ3JDLHNDQUEyQztBQUMzQyxnREFBOEM7QUFDOUMsb0NBQW1DO0FBR25DLElBQWEsb0JBQW9CO0lBTWhDLDhCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQU8sR0FBUCxVQUFRLFFBQWtCO1FBQ3pCLElBQU0sUUFBUSxHQUFHLGVBQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCO2NBQzNDLGVBQU0sQ0FBQyxTQUFTLEdBQUcseUJBQXlCO2NBQzVDLHlCQUF5QixHQUFHLGVBQU0sQ0FBQyxPQUFPO2NBQzFDLGFBQWEsR0FBRyxlQUFNLENBQUMsU0FBUyxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDcEMsU0FBUyxDQUNULFVBQUMsUUFBUSxJQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNDLFVBQUMsS0FBSyxJQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLG9CQUFvQjtJQURoQyxpQkFBVSxFQUFFO3FDQU9jLFdBQUk7R0FObEIsb0JBQW9CLENBeUJoQztBQXpCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSBcIi4uL2h0dHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRWZWhpY2xlU2VydmljZSB7XHJcblx0aHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlO1xyXG5cdHVzZXI6IHN0cmluZztcclxuXHRzb2NpZXR5SUQ6IHN0cmluZztcclxuXHRtYXhQYWdlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcclxuXHRcdHRoaXMuaHR0cFNlcnZpY2UgPSBuZXcgSHR0cFNlcnZpY2UoaHR0cCk7XHJcblx0XHR0aGlzLnVzZXIgPSBDb25maWcudXNlcjtcclxuXHRcdHRoaXMuc29jaWV0eUlEID0gQ29uZmlnLnNvY2lldHlJRDtcclxuXHRcdHRoaXMubWF4UGFnZSA9IENvbmZpZy5tYXhQYWdlO1xyXG5cdH1cclxuXHJcblx0Z2V0TGlzdChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGNvbnN0IGVuZHBvaW50ID0gQ29uZmlnLnVzZXIgKyAnL2FwaS9zb2NpZXRpZXMvJyBcclxuXHRcdFx0XHRcdCsgQ29uZmlnLnNvY2lldHlJRCArICcvY2xpZW50LXZlaGljbGUtc3VtbWFyeSdcclxuXHRcdFx0XHRcdCsgJz9wYWdlTnVtYmVyPTEmcGFnZVNpemU9JyArIENvbmZpZy5tYXhQYWdlXHJcblx0XHRcdFx0XHQrICcmY29tcGFueUlEPScgKyBDb25maWcuY29tcGFueUlEO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChlbmRwb2ludClcclxuXHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdChyZXNwb25zZSkgPT4geyBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7IH0sXHJcblx0XHRcdChlcnJvcikgPT4geyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cclxuXHRcdCk7XHJcblx0fVxyXG59Il19