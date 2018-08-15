"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var config_1 = require("../config");
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
        this.httpService = new http_service_1.HttpService(http);
    }
    CompanyService.prototype.getList = function (callback) {
        var endpoint = 'companies-by-page'
            + '?pageNumber=1&pageSize=' + config_1.Config.maxPage;
        return this.httpService.get(endpoint)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFueS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGFueS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFDO0FBQ3JDLHNDQUEyQztBQUMzQyxnREFBOEM7QUFDOUMsb0NBQW1DO0FBR25DLElBQWEsY0FBYztJQUcxQix3QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxRQUFrQjtRQUN6QixJQUFNLFFBQVEsR0FBRyxtQkFBbUI7Y0FDL0IseUJBQXlCLEdBQUcsZUFBTSxDQUFDLE9BQU8sQ0FBQztRQUVoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ3BDLFNBQVMsQ0FDVCxVQUFDLFFBQVEsSUFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQyxVQUFDLEtBQUssSUFBTyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQWpCWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBSWMsV0FBSTtHQUhsQixjQUFjLENBaUIxQjtBQWpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHAgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tIFwiLi4vaHR0cC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbXBhbnlTZXJ2aWNlIHtcclxuXHRodHRwU2VydmljZTogSHR0cFNlcnZpY2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xyXG5cdFx0dGhpcy5odHRwU2VydmljZSA9IG5ldyBIdHRwU2VydmljZShodHRwKTtcclxuXHR9XHJcblxyXG5cdGdldExpc3QoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblx0XHRjb25zdCBlbmRwb2ludCA9ICdjb21wYW5pZXMtYnktcGFnZSdcclxuXHRcdFx0XHRcdCsgJz9wYWdlTnVtYmVyPTEmcGFnZVNpemU9JyArIENvbmZpZy5tYXhQYWdlO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChlbmRwb2ludClcclxuXHRcdC5zdWJzY3JpYmUoXHJcblx0XHRcdChyZXNwb25zZSkgPT4geyBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7IH0sXHJcblx0XHRcdChlcnJvcikgPT4geyBjYWxsYmFjayhlcnJvciwgbnVsbCk7IH1cclxuXHRcdCk7XHJcblx0fVxyXG59Il19