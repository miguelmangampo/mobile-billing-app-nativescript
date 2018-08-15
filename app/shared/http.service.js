"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var config_1 = require("./config");
require("rxjs/add/operator/map");
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.generatedUrl = config_1.Config.apiUrl;
        this.headers = new http_1.Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", "GMSAuth " + config_1.Config.token);
    }
    HttpService.prototype.get = function (url) {
        return this.http.get(this.generatedUrl + url, {
            headers: this.headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            return data;
        })
            .catch(this.handleErrors);
    };
    HttpService.prototype.post = function (url, bodyParam) {
        return this.http.post(this.generatedUrl + url, JSON.stringify(bodyParam), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            return data;
        })
            .catch(this.handleErrors);
    };
    HttpService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw4QkFBcUM7QUFDckMsbUNBQWtDO0FBQ2xDLGlDQUErQjtBQUcvQixJQUFhLFdBQVc7SUFJdkIscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHlCQUFHLEdBQUgsVUFBSSxHQUFHO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQzdDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUNyQixDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxHQUFXLEVBQUUsU0FBUztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUN6QixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQzNCO2FBQ0EsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxLQUFlO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQUtjLFdBQUk7R0FKbEIsV0FBVyxDQXVDdkI7QUF2Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvUnhcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cFNlcnZpY2Uge1xyXG5cdGdlbmVyYXRlZFVybDogc3RyaW5nO1xyXG5cdGhlYWRlcnM6IEhlYWRlcnNcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XHJcblx0XHR0aGlzLmdlbmVyYXRlZFVybCA9IENvbmZpZy5hcGlVcmw7XHJcblx0XHR0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG5cdFx0dGhpcy5oZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblx0XHR0aGlzLmhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkdNU0F1dGggXCIgKyBDb25maWcudG9rZW4pO1xyXG5cdH1cclxuXHJcblx0Z2V0KHVybCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5nZW5lcmF0ZWRVcmwgKyB1cmwsIHtcclxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzXHJcblx0XHR9KVxyXG5cdFx0Lm1hcChyZXMgPT4gcmVzLmpzb24oKSlcclxuXHRcdC5tYXAoZGF0YSA9PiB7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSlcclxuXHRcdC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XHJcblx0fVxyXG5cclxuXHRwb3N0KHVybDogc3RyaW5nLCBib2R5UGFyYW0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxyXG5cdFx0XHR0aGlzLmdlbmVyYXRlZFVybCArIHVybFxyXG5cdFx0XHQsIEpTT04uc3RyaW5naWZ5KGJvZHlQYXJhbSlcclxuXHRcdFx0LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9XHJcblx0XHQpXHJcblx0XHQubWFwKHJlcyA9PiByZXMuanNvbigpKVxyXG5cdFx0Lm1hcChkYXRhID0+IHtcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuXHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xyXG5cdFx0cmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3IpO1xyXG5cdH1cclxufVxyXG4iXX0=