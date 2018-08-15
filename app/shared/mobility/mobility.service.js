"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var MobilityService = (function () {
    function MobilityService(http) {
        this.http = http;
        this.url = 'mobilities';
        this.httpService = new http_service_1.HttpService(http);
    }
    MobilityService.prototype.getOne = function (mobilityID, callback) {
        return this.httpService.get(this.url + '/' + mobilityID)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    MobilityService.prototype.getAll = function (callback) {
        return this.httpService.get(this.url)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return MobilityService;
}());
MobilityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MobilityService);
exports.MobilityService = MobilityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vYmlsaXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFDckMsc0NBQTJDO0FBQzNDLGdEQUE4QztBQUc5QyxJQUFhLGVBQWU7SUFJM0IseUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sVUFBa0IsRUFBRSxRQUFrQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO2FBQ3ZELFNBQVMsQ0FDVCxVQUFDLFFBQVEsSUFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQyxVQUFDLEtBQUssSUFBTyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxRQUFrQjtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNwQyxTQUFTLENBQ1QsVUFBQyxRQUFRLElBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0MsVUFBQyxLQUFLLElBQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDckMsQ0FBQztJQUNILENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksZUFBZTtJQUQzQixpQkFBVSxFQUFFO3FDQUtjLFdBQUk7R0FKbEIsZUFBZSxDQXdCM0I7QUF4QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSBcIi4uL2h0dHAuc2VydmljZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTW9iaWxpdHlTZXJ2aWNlIHtcclxuXHRodHRwU2VydmljZTogSHR0cFNlcnZpY2U7XHJcblx0dXJsOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xyXG5cdFx0dGhpcy51cmwgPSAnbW9iaWxpdGllcyc7XHJcblx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gbmV3IEh0dHBTZXJ2aWNlKGh0dHApO1xyXG5cdH1cclxuXHJcblx0Z2V0T25lKG1vYmlsaXR5SUQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQodGhpcy51cmwgKyAnLycgKyBtb2JpbGl0eUlEKVxyXG5cdFx0LnN1YnNjcmliZShcclxuXHRcdFx0KHJlc3BvbnNlKSA9PiB7IGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTsgfSxcclxuXHRcdFx0KGVycm9yKSA9PiB7IGNhbGxiYWNrKGVycm9yLCBudWxsKTsgfVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdGdldEFsbChjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldCh0aGlzLnVybClcclxuXHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdChyZXNwb25zZSkgPT4geyBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7IH0sXHJcblx0XHRcdChlcnJvcikgPT4geyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cclxuXHRcdCk7XHJcblx0fVxyXG59Il19