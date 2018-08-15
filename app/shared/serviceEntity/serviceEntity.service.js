"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var config_1 = require("../config");
var ServiceEntityService = (function () {
    function ServiceEntityService(http) {
        this.http = http;
        this.httpService = new http_service_1.HttpService(http);
    }
    ServiceEntityService.prototype.getOne = function (serviceEntityID, callback) {
        var endpoint = config_1.Config.user + '/api/societies/'
            + config_1.Config.societyID + '/service-entities/'
            + serviceEntityID;
        return this.httpService.get(endpoint)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    ServiceEntityService.prototype.activation = function (serviceEntityID, status, reservation, callback) {
        var endpoint = config_1.Config.user + '/api/societies/'
            + config_1.Config.societyID + '/service-entities/'
            + serviceEntityID + '/activation';
        var body = {
            operation: status,
            reservation: reservation,
        };
        return this.httpService.post(endpoint, body)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return ServiceEntityService;
}());
ServiceEntityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ServiceEntityService);
exports.ServiceEntityService = ServiceEntityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZUVudGl0eS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZUVudGl0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFDO0FBQ3JDLHNDQUEyQztBQUMzQyxnREFBOEM7QUFDOUMsb0NBQW1DO0FBR25DLElBQWEsb0JBQW9CO0lBR2hDLDhCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUNBQU0sR0FBTixVQUFPLGVBQWUsRUFBRSxRQUFrQjtRQUN6QyxJQUFNLFFBQVEsR0FBRyxlQUFNLENBQUMsSUFBSSxHQUFHLGlCQUFpQjtjQUMxQyxlQUFNLENBQUMsU0FBUyxHQUFHLG9CQUFvQjtjQUN2QyxlQUFlLENBQUM7UUFFdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUNwQyxTQUFTLENBQ1QsVUFBQyxRQUFRLElBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0MsVUFBQyxLQUFLLElBQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDckMsQ0FBQztJQUNILENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsZUFBZSxFQUFFLE1BQWMsRUFBRSxXQUFvQixFQUFFLFFBQWtCO1FBQ25GLElBQU0sUUFBUSxHQUFHLGVBQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCO2NBQzFDLGVBQU0sQ0FBQyxTQUFTLEdBQUcsb0JBQW9CO2NBQ3ZDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFFckMsSUFBTSxJQUFJLEdBQUc7WUFDWixTQUFTLEVBQUUsTUFBTTtZQUNqQixXQUFXLEVBQUUsV0FBVztTQUN4QixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7YUFDM0MsU0FBUyxDQUNULFVBQUMsUUFBUSxJQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNDLFVBQUMsS0FBSyxJQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDO0FBbENZLG9CQUFvQjtJQURoQyxpQkFBVSxFQUFFO3FDQUljLFdBQUk7R0FIbEIsb0JBQW9CLENBa0NoQztBQWxDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSBcIi4uL2h0dHAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlRW50aXR5U2VydmljZSB7XHJcblx0aHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcclxuXHRcdHRoaXMuaHR0cFNlcnZpY2UgPSBuZXcgSHR0cFNlcnZpY2UoaHR0cCk7XHJcblx0fVxyXG5cclxuXHRnZXRPbmUoc2VydmljZUVudGl0eUlELCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdGNvbnN0IGVuZHBvaW50ID0gQ29uZmlnLnVzZXIgKyAnL2FwaS9zb2NpZXRpZXMvJ1xyXG5cdFx0XHRcdFx0XHQrIENvbmZpZy5zb2NpZXR5SUQgKyAnL3NlcnZpY2UtZW50aXRpZXMvJ1xyXG5cdFx0XHRcdFx0XHQrIHNlcnZpY2VFbnRpdHlJRDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoZW5kcG9pbnQpXHJcblx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHQocmVzcG9uc2UpID0+IHsgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpOyB9LFxyXG5cdFx0XHQoZXJyb3IpID0+IHsgY2FsbGJhY2soZXJyb3IsIG51bGwpOyB9XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0YWN0aXZhdGlvbihzZXJ2aWNlRW50aXR5SUQsIHN0YXR1czogc3RyaW5nLCByZXNlcnZhdGlvbjogYm9vbGVhbiwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRjb25zdCBlbmRwb2ludCA9IENvbmZpZy51c2VyICsgJy9hcGkvc29jaWV0aWVzLydcclxuXHRcdFx0XHRcdFx0KyBDb25maWcuc29jaWV0eUlEICsgJy9zZXJ2aWNlLWVudGl0aWVzLydcclxuXHRcdFx0XHRcdFx0KyBzZXJ2aWNlRW50aXR5SUQgKyAnL2FjdGl2YXRpb24nXHJcblxyXG5cdFx0Y29uc3QgYm9keSA9IHsgXHJcblx0XHRcdG9wZXJhdGlvbjogc3RhdHVzLFxyXG5cdFx0XHRyZXNlcnZhdGlvbjogcmVzZXJ2YXRpb24sXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChlbmRwb2ludCwgYm9keSlcclxuXHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdChyZXNwb25zZSkgPT4geyBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7IH0sXHJcblx0XHRcdChlcnJvcikgPT4geyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiJdfQ==