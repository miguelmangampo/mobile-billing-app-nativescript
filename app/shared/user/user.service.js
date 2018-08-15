"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.httpService = new http_service_1.HttpService(http);
    }
    UserService.prototype.authenticate = function (username, password, callback) {
        var body = {
            Username: username,
            Password: password
        };
        return this.httpService.post('login', body)
            .subscribe(function (response) { callback(null, response); }, function (error) { callback(error, null); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFDO0FBQ3JDLHNDQUEyQztBQUMzQyxnREFBOEM7QUFHOUMsSUFBYSxXQUFXO0lBTXZCLHFCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxRQUFrQjtRQUNsRSxJQUFNLElBQUksR0FBRztZQUNaLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1NBQ2xCLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzthQUMxQyxTQUFTLENBQ1QsVUFBQyxRQUFRLElBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0MsVUFBQyxLQUFLLElBQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDckMsQ0FBQztJQUNILENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQU9jLFdBQUk7R0FObEIsV0FBVyxDQXFCdkI7QUFyQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSBcIi4uL2h0dHAuc2VydmljZVwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG5cdGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZTtcclxuXHR1c2VyOiBzdHJpbmc7XHJcblx0c29jaWV0eUlEOiBzdHJpbmc7XHJcblx0bWF4UGFnZTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XHJcblx0XHR0aGlzLmh0dHBTZXJ2aWNlID0gbmV3IEh0dHBTZXJ2aWNlKGh0dHApO1xyXG5cdH1cclxuXHJcblx0YXV0aGVudGljYXRlKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG5cdFx0Y29uc3QgYm9keSA9IHtcclxuXHRcdFx0VXNlcm5hbWU6IHVzZXJuYW1lLFxyXG5cdFx0XHRQYXNzd29yZDogcGFzc3dvcmRcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KCdsb2dpbicsIGJvZHkpXHJcblx0XHQuc3Vic2NyaWJlKFxyXG5cdFx0XHQocmVzcG9uc2UpID0+IHsgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpOyB9LFxyXG5cdFx0XHQoZXJyb3IpID0+IHsgY2FsbGJhY2soZXJyb3IsIG51bGwpOyB9XHJcblx0XHQpO1xyXG5cdH1cclxufSJdfQ==