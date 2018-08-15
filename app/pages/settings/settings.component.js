"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var config_1 = require("../../shared/config");
var utilities_1 = require("../../utils/utilities");
var moment = require("moment");
var SettingsComponent = (function () {
    function SettingsComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.settings = {
            appDateTime: '',
            urlEndpoint: '',
            maxRecords: 0,
            company: {},
        };
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.settings.urlEndpoint = config_1.Config.apiUrl;
        this.settings.maxRecords = config_1.Config.maxPage;
        this.settings.appDateTime = utilities_1.formatDatetime(moment());
    };
    SettingsComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    SettingsComponent.prototype.save = function () {
        config_1.Config.apiUrl = this.settings.urlEndpoint;
        config_1.Config.maxPage = this.settings.maxRecords;
        alert('Settings successfully saved.');
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: "settings",
        providers: [],
        templateUrl: "pages/settings/settings.html",
        styleUrls: [
            "pages/settings/settings-common.css",
            "pages/settings/settings.css"
        ]
        /*
        templateUrl: "./settings.html",
        styleUrls: [
            "./settings-common.css",
            "./settings.css"
        ]
        */
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHNEQUErRDtBQUMvRCw4Q0FBNkM7QUFDN0MsbURBQXdFO0FBR3hFLCtCQUFpQztBQW9CakMsSUFBYSxpQkFBaUI7SUFRN0IsMkJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUHRELGFBQVEsR0FBRztZQUNWLFdBQVcsRUFBRSxFQUFFO1lBQ2YsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsQ0FBQztZQUNiLE9BQU8sRUFBRSxFQUFFO1NBQ1gsQ0FBQztJQUV1RCxDQUFDO0lBRTFELG9DQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLGVBQU0sQ0FBQyxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsMEJBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0MsZUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxlQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQzFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksaUJBQWlCO0lBbEI3QixnQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsU0FBUyxFQUFFLEVBQUU7UUFFYixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRTtZQUNWLG9DQUFvQztZQUNwQyw2QkFBNkI7U0FDN0I7UUFFRDs7Ozs7O1VBTUU7S0FDRixDQUFDO3FDQVNxQyx5QkFBZ0I7R0FSMUMsaUJBQWlCLENBeUI3QjtBQXpCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuaW1wb3J0IHsgaXNDb21wYW55T3JpZ2luLCBmb3JtYXREYXRldGltZSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIFZhbHVlTGlzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJzZXR0aW5nc1wiLFxyXG5cdHByb3ZpZGVyczogW10sXHJcblx0XHJcblx0dGVtcGxhdGVVcmw6IFwicGFnZXMvc2V0dGluZ3Mvc2V0dGluZ3MuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCJwYWdlcy9zZXR0aW5ncy9zZXR0aW5ncy1jb21tb24uY3NzXCIsIFxyXG5cdFx0XCJwYWdlcy9zZXR0aW5ncy9zZXR0aW5ncy5jc3NcIlxyXG5cdF1cclxuXHRcclxuXHQvKlxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vc2V0dGluZ3MuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1xyXG5cdFx0XCIuL3NldHRpbmdzLWNvbW1vbi5jc3NcIiwgXHJcblx0XHRcIi4vc2V0dGluZ3MuY3NzXCJcclxuXHRdXHJcblx0Ki9cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRzZXR0aW5ncyA9IHtcclxuXHRcdGFwcERhdGVUaW1lOiAnJyxcclxuXHRcdHVybEVuZHBvaW50OiAnJyxcclxuXHRcdG1heFJlY29yZHM6IDAsXHJcblx0XHRjb21wYW55OiB7fSxcclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHt9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncy51cmxFbmRwb2ludCA9IENvbmZpZy5hcGlVcmw7XHJcblx0XHR0aGlzLnNldHRpbmdzLm1heFJlY29yZHMgPSBDb25maWcubWF4UGFnZTtcclxuXHRcdHRoaXMuc2V0dGluZ3MuYXBwRGF0ZVRpbWUgPSBmb3JtYXREYXRldGltZShtb21lbnQoKSk7XHJcblx0fVxyXG5cclxuXHRnb0JhY2soKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcblx0c2F2ZSgpIHtcclxuXHRcdENvbmZpZy5hcGlVcmwgPSB0aGlzLnNldHRpbmdzLnVybEVuZHBvaW50O1xyXG5cdFx0Q29uZmlnLm1heFBhZ2UgPSB0aGlzLnNldHRpbmdzLm1heFJlY29yZHM7XHJcblx0XHRhbGVydCgnU2V0dGluZ3Mgc3VjY2Vzc2Z1bGx5IHNhdmVkLicpXHJcblx0fVxyXG59Il19