"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var user_service_1 = require("../../shared/user/user.service");
var LoginComponent = (function () {
    function LoginComponent(router, page, userService) {
        this.router = router;
        this.page = page;
        this.userService = userService;
        this.user = {
            username: '',
            password: ''
        };
        this.isLoading = false;
        this.page.actionBarHidden = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.user.username = '';
        this.user.password = '';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        this.userService.authenticate(this.user.username, this.user.password, function (error, response) {
            _this.isLoading = false;
            if (error) {
                var errMsg = (error._body && error._body.msg) ? error._body.msg : 'Error upon login, please check your internet connection.';
                alert(errMsg);
                return;
            }
            config_1.Config.token = response.token;
            config_1.Config.user = response.user;
            config_1.Config.societyID = response.gmsContractID;
            config_1.Config.companyID = response.companyID;
            config_1.Config.companyCode = response.companyCode;
            _this.user.password = '';
            _this.router.navigate(["/dashboard"]);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        providers: [user_service_1.UserService],
        templateUrl: "pages/login/login.html",
        styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
        /*
        templateUrl: "./login.html",
        styleUrls: ["./login-common.css", "./login.css"]
        */
    }),
    __metadata("design:paramtypes", [router_1.Router,
        page_1.Page,
        user_service_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLDBDQUF5QztBQUV6QyxnQ0FBK0I7QUFLL0IsOENBQTZDO0FBQzdDLCtEQUE2RDtBQWU3RCxJQUFhLGNBQWM7SUFPMUIsd0JBQW9CLE1BQWMsRUFDdEIsSUFBVSxFQUNWLFdBQXdCO1FBRmhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUnBDLFNBQUksR0FBRztZQUNOLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7U0FDWixDQUFDO1FBQ0YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUtqQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQUEsaUJBa0JDO1FBakJBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLFFBQVE7WUFDckYsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRywwREFBMEQsQ0FBQTtnQkFDOUgsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQztZQUNSLENBQUM7WUFFRCxlQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDOUIsZUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzVCLGVBQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUMxQyxlQUFNLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDdEMsZUFBTSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzFDLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLGNBQWM7SUFiMUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7UUFFeEIsV0FBVyxFQUFFLHdCQUF3QjtRQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztRQUVwRTs7O1VBR0U7S0FFRixDQUFDO3FDQVEyQixlQUFNO1FBQ2hCLFdBQUk7UUFDRywwQkFBVztHQVR4QixjQUFjLENBcUMxQjtBQXJDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlnXCI7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwibXktYXBwXCIsXHJcblx0cHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxyXG5cdFxyXG5cdHRlbXBsYXRlVXJsOiBcInBhZ2VzL2xvZ2luL2xvZ2luLmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFtcInBhZ2VzL2xvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9sb2dpbi9sb2dpbi5jc3NcIl1cclxuXHRcclxuXHQvKlxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vbG9naW4uaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1wiLi9sb2dpbi1jb21tb24uY3NzXCIsIFwiLi9sb2dpbi5jc3NcIl1cclxuXHQqL1xyXG5cdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHVzZXIgPSB7XHJcblx0XHR1c2VybmFtZTogJycsXHJcblx0XHRwYXNzd29yZDogJydcclxuXHR9O1xyXG5cdGlzTG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcblx0XHRcdCwgcHJpdmF0ZSBwYWdlOiBQYWdlXHJcblx0XHRcdCwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcclxuXHRcdHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLnVzZXIudXNlcm5hbWUgPSAnJztcclxuXHRcdHRoaXMudXNlci5wYXNzd29yZCA9ICcnO1xyXG5cdH1cclxuXHJcblx0bG9naW4oKSB7XHJcblx0XHR0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblx0XHR0aGlzLnVzZXJTZXJ2aWNlLmF1dGhlbnRpY2F0ZSh0aGlzLnVzZXIudXNlcm5hbWUsIHRoaXMudXNlci5wYXNzd29yZCwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xyXG5cdFx0XHR0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zdCBlcnJNc2cgPSAoZXJyb3IuX2JvZHkgJiYgZXJyb3IuX2JvZHkubXNnKSA/IGVycm9yLl9ib2R5Lm1zZyA6ICdFcnJvciB1cG9uIGxvZ2luLCBwbGVhc2UgY2hlY2sgeW91ciBpbnRlcm5ldCBjb25uZWN0aW9uLidcclxuXHRcdFx0XHRhbGVydChlcnJNc2cpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fSBcclxuXHJcblx0XHRcdENvbmZpZy50b2tlbiA9IHJlc3BvbnNlLnRva2VuO1xyXG5cdFx0XHRDb25maWcudXNlciA9IHJlc3BvbnNlLnVzZXI7XHJcblx0XHRcdENvbmZpZy5zb2NpZXR5SUQgPSByZXNwb25zZS5nbXNDb250cmFjdElEO1xyXG5cdFx0XHRDb25maWcuY29tcGFueUlEID0gcmVzcG9uc2UuY29tcGFueUlEO1xyXG5cdFx0XHRDb25maWcuY29tcGFueUNvZGUgPSByZXNwb25zZS5jb21wYW55Q29kZTtcclxuXHRcdFx0dGhpcy51c2VyLnBhc3N3b3JkID0gJyc7XHJcblx0XHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9kYXNoYm9hcmRcIl0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59Il19