"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var config_1 = require("../../shared/config");
var _ = require("lodash");
var utilities_1 = require("../../utils/utilities");
var FiltersComponent = (function () {
    function FiltersComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.isCompanyOrigin = false;
        this.companyDropDownIndex = 0;
        this.companyDropDownItems = [];
        this._companyList = [];
        this.runningStatus_DropDownIndex = 0;
        this.commStatus_DropDownIndex = 0;
        this.activationStatus_DropDownIndex = 0;
        this.dueDate_DropDownIndex = 0;
        this.isCompanyOrigin = utilities_1.isCompanyOrigin();
        this.initCompanyDropDown();
        var runningTypes = config_1.Config.filters.types.running;
        this.runningStatus_DropDownItems = [
            runningTypes.ALL,
            runningTypes.RUN,
            runningTypes.IDLING,
            runningTypes.STOP,
            runningTypes.UNKNOWN,
        ];
        this.runningStatus_DropDownIndex = _.findIndex(this.runningStatus_DropDownItems, function (status) {
            return status == config_1.Config.filters.running;
        });
        var commTypes = config_1.Config.filters.types.comm;
        this.commStatus_DropDownItems = [
            commTypes.ALL,
            commTypes.COMM,
            commTypes.NOTCOMM,
            commTypes.SLEEP,
            commTypes.UNKNOWN,
        ];
        this.commStatus_DropDownIndex = _.findIndex(this.commStatus_DropDownItems, function (status) {
            return status == config_1.Config.filters.comm;
        });
        var activationTypes = config_1.Config.filters.types.activation;
        this.activationStatus_DropDownItems = [
            activationTypes.ALL,
            activationTypes.ACTIVE,
            activationTypes.INACTIVE,
            activationTypes.ACTIVATING,
            activationTypes.DEACTIVATING,
            activationTypes.WAITING_TO_ACT,
            activationTypes.WAITING_TO_DEACT,
            activationTypes.UNKNOWN,
            activationTypes.RESERVING_TO_ACTIVATE,
            activationTypes.RESERVING_TO_DEACTIVATE,
        ];
        this.activationStatus_DropDownIndex = _.findIndex(this.activationStatus_DropDownItems, function (status) {
            return status == config_1.Config.filters.activation;
        });
        var dueDateTypes = config_1.Config.filters.types.dueDate;
        this.dueDate_DropDownItems = [
            dueDateTypes.ALL,
            dueDateTypes.DUE_TODAY,
            dueDateTypes.WITH_PAST_DUES,
            dueDateTypes.NOT_DUE,
        ];
        this.dueDate_DropDownIndex = _.findIndex(this.dueDate_DropDownItems, function (status) {
            return status == config_1.Config.filters.dueDate;
        });
    }
    FiltersComponent.prototype.ngOnInit = function () {
    };
    FiltersComponent.prototype.initCompanyDropDown = function () {
        var _this = this;
        this._companyList = config_1.Config.companyList;
        var counter = 0;
        _.forEach(this._companyList, function (company) {
            if (company.id == config_1.Config.companyID) {
                _this.companyDropDownIndex = counter;
            }
            _this.companyDropDownItems.push(company.companyCode + ' / ' + company.societyID);
            counter++;
        });
    };
    FiltersComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    FiltersComponent.prototype.save = function () {
        var selectedCompany = this._companyList[this.companyDropDownIndex];
        config_1.Config.companyID = selectedCompany.id;
        config_1.Config.societyID = selectedCompany.societyID;
        config_1.Config.filters.running = this.runningStatus_DropDownItems[this.runningStatus_DropDownIndex];
        config_1.Config.filters.comm = this.commStatus_DropDownItems[this.commStatus_DropDownIndex];
        config_1.Config.filters.activation = this.activationStatus_DropDownItems[this.activationStatus_DropDownIndex];
        config_1.Config.filters.dueDate = this.dueDate_DropDownItems[this.dueDate_DropDownIndex];
        alert('Filters successfully saved.');
    };
    return FiltersComponent;
}());
FiltersComponent = __decorate([
    core_1.Component({
        selector: "filters",
        providers: [],
        templateUrl: "pages/filters/filters.html",
        styleUrls: ["pages/filters/filters-common.css", "pages/filters/filters.css"]
        /*
        templateUrl: "./filters.html",
        styleUrls: ["./filters-common.css", "./filters.css"]
        */
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], FiltersComponent);
exports.FiltersComponent = FiltersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxzREFBK0Q7QUFDL0QsOENBQTZDO0FBQzdDLDBCQUE0QjtBQUU1QixtREFBd0Q7QUFjeEQsSUFBYSxnQkFBZ0I7SUFtQjVCLDBCQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWxCdEQsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHlCQUFvQixHQUFrQixFQUFFLENBQUM7UUFDekMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsZ0NBQTJCLEdBQUcsQ0FBQyxDQUFDO1FBR2hDLDZCQUF3QixHQUFHLENBQUMsQ0FBQztRQUc3QixtQ0FBOEIsR0FBRyxDQUFDLENBQUM7UUFHbkMsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBSXpCLElBQUksQ0FBQyxlQUFlLEdBQUcsMkJBQWUsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLElBQU0sWUFBWSxHQUFHLGVBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxJQUFJLENBQUMsMkJBQTJCLEdBQUc7WUFDbEMsWUFBWSxDQUFDLEdBQUc7WUFDaEIsWUFBWSxDQUFDLEdBQUc7WUFDaEIsWUFBWSxDQUFDLE1BQU07WUFDbkIsWUFBWSxDQUFDLElBQUk7WUFDakIsWUFBWSxDQUFDLE9BQU87U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQywyQkFBMkIsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxVQUFDLE1BQU07WUFDdkYsTUFBTSxDQUFDLE1BQU0sSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUN6QyxD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ZUFBTSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQ3RDLGVBQU0sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUU3QyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDNUYsZUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ25GLGVBQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNyRyxlQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEYsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQTNHRCxJQTJHQztBQTNHWSxnQkFBZ0I7SUFaNUIsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFNBQVMsRUFBRSxFQUFFO1FBRWIsV0FBVyxFQUFFLDRCQUE0QjtRQUN6QyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQztRQUU1RTs7O1VBR0U7S0FDRixDQUFDO3FDQW9CcUMseUJBQWdCO0dBbkIxQyxnQkFBZ0IsQ0EyRzVCO0FBM0dZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5pbXBvcnQgeyBpc0NvbXBhbnlPcmlnaW4gfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbGl0aWVzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJmaWx0ZXJzXCIsXHJcblx0cHJvdmlkZXJzOiBbXSxcclxuXHRcclxuXHR0ZW1wbGF0ZVVybDogXCJwYWdlcy9maWx0ZXJzL2ZpbHRlcnMuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1wicGFnZXMvZmlsdGVycy9maWx0ZXJzLWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9maWx0ZXJzL2ZpbHRlcnMuY3NzXCJdXHJcblx0XHJcblx0LypcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZpbHRlcnMuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogW1wiLi9maWx0ZXJzLWNvbW1vbi5jc3NcIiwgXCIuL2ZpbHRlcnMuY3NzXCJdXHJcblx0Ki9cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbHRlcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGlzQ29tcGFueU9yaWdpbiA9IGZhbHNlO1xyXG5cclxuXHRjb21wYW55RHJvcERvd25JbmRleCA9IDA7XHJcblx0Y29tcGFueURyb3BEb3duSXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRfY29tcGFueUxpc3QgPSBbXTtcclxuXHJcblx0cnVubmluZ1N0YXR1c19Ecm9wRG93bkluZGV4ID0gMDtcclxuXHRydW5uaW5nU3RhdHVzX0Ryb3BEb3duSXRlbXM6IEFycmF5PHN0cmluZz47XHJcblxyXG5cdGNvbW1TdGF0dXNfRHJvcERvd25JbmRleCA9IDA7XHJcblx0Y29tbVN0YXR1c19Ecm9wRG93bkl0ZW1zOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuXHRhY3RpdmF0aW9uU3RhdHVzX0Ryb3BEb3duSW5kZXggPSAwO1xyXG5cdGFjdGl2YXRpb25TdGF0dXNfRHJvcERvd25JdGVtczogQXJyYXk8c3RyaW5nPjtcclxuXHJcblx0ZHVlRGF0ZV9Ecm9wRG93bkluZGV4ID0gMDtcclxuXHRkdWVEYXRlX0Ryb3BEb3duSXRlbXM6IEFycmF5PHN0cmluZz47XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG5cdFx0dGhpcy5pc0NvbXBhbnlPcmlnaW4gPSBpc0NvbXBhbnlPcmlnaW4oKTtcclxuXHRcdHRoaXMuaW5pdENvbXBhbnlEcm9wRG93bigpO1xyXG5cclxuXHRcdGNvbnN0IHJ1bm5pbmdUeXBlcyA9IENvbmZpZy5maWx0ZXJzLnR5cGVzLnJ1bm5pbmc7XHJcblx0XHR0aGlzLnJ1bm5pbmdTdGF0dXNfRHJvcERvd25JdGVtcyA9IFtcclxuXHRcdFx0cnVubmluZ1R5cGVzLkFMTCxcclxuXHRcdFx0cnVubmluZ1R5cGVzLlJVTixcclxuXHRcdFx0cnVubmluZ1R5cGVzLklETElORyxcclxuXHRcdFx0cnVubmluZ1R5cGVzLlNUT1AsXHJcblx0XHRcdHJ1bm5pbmdUeXBlcy5VTktOT1dOLFxyXG5cdFx0XTtcclxuXHRcdHRoaXMucnVubmluZ1N0YXR1c19Ecm9wRG93bkluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5ydW5uaW5nU3RhdHVzX0Ryb3BEb3duSXRlbXMsIChzdGF0dXMpID0+IHtcclxuXHRcdFx0cmV0dXJuIHN0YXR1cyA9PSBDb25maWcuZmlsdGVycy5ydW5uaW5nO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc3QgY29tbVR5cGVzID0gQ29uZmlnLmZpbHRlcnMudHlwZXMuY29tbTtcclxuXHRcdHRoaXMuY29tbVN0YXR1c19Ecm9wRG93bkl0ZW1zID0gW1xyXG5cdFx0XHRjb21tVHlwZXMuQUxMLFxyXG5cdFx0XHRjb21tVHlwZXMuQ09NTSxcclxuXHRcdFx0Y29tbVR5cGVzLk5PVENPTU0sXHJcblx0XHRcdGNvbW1UeXBlcy5TTEVFUCxcclxuXHRcdFx0Y29tbVR5cGVzLlVOS05PV04sXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5jb21tU3RhdHVzX0Ryb3BEb3duSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmNvbW1TdGF0dXNfRHJvcERvd25JdGVtcywgKHN0YXR1cykgPT4ge1xyXG5cdFx0XHRyZXR1cm4gc3RhdHVzID09IENvbmZpZy5maWx0ZXJzLmNvbW07XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBhY3RpdmF0aW9uVHlwZXMgPSBDb25maWcuZmlsdGVycy50eXBlcy5hY3RpdmF0aW9uO1xyXG5cdFx0dGhpcy5hY3RpdmF0aW9uU3RhdHVzX0Ryb3BEb3duSXRlbXMgPSBbXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5BTEwsXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5BQ1RJVkUsXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5JTkFDVElWRSxcclxuXHRcdFx0YWN0aXZhdGlvblR5cGVzLkFDVElWQVRJTkcsXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5ERUFDVElWQVRJTkcsXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5XQUlUSU5HX1RPX0FDVCxcclxuXHRcdFx0YWN0aXZhdGlvblR5cGVzLldBSVRJTkdfVE9fREVBQ1QsXHJcblx0XHRcdGFjdGl2YXRpb25UeXBlcy5VTktOT1dOLFxyXG5cdFx0XHRhY3RpdmF0aW9uVHlwZXMuUkVTRVJWSU5HX1RPX0FDVElWQVRFLFxyXG5cdFx0XHRhY3RpdmF0aW9uVHlwZXMuUkVTRVJWSU5HX1RPX0RFQUNUSVZBVEUsXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5hY3RpdmF0aW9uU3RhdHVzX0Ryb3BEb3duSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmFjdGl2YXRpb25TdGF0dXNfRHJvcERvd25JdGVtcywgKHN0YXR1cykgPT4ge1xyXG5cdFx0XHRyZXR1cm4gc3RhdHVzID09IENvbmZpZy5maWx0ZXJzLmFjdGl2YXRpb247XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zdCBkdWVEYXRlVHlwZXMgPSBDb25maWcuZmlsdGVycy50eXBlcy5kdWVEYXRlO1xyXG5cdFx0dGhpcy5kdWVEYXRlX0Ryb3BEb3duSXRlbXMgPSBbXHJcblx0XHRcdGR1ZURhdGVUeXBlcy5BTEwsXHJcblx0XHRcdGR1ZURhdGVUeXBlcy5EVUVfVE9EQVksXHJcblx0XHRcdGR1ZURhdGVUeXBlcy5XSVRIX1BBU1RfRFVFUyxcclxuXHRcdFx0ZHVlRGF0ZVR5cGVzLk5PVF9EVUUsXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5kdWVEYXRlX0Ryb3BEb3duSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmR1ZURhdGVfRHJvcERvd25JdGVtcywgKHN0YXR1cykgPT4ge1xyXG5cdFx0XHRyZXR1cm4gc3RhdHVzID09IENvbmZpZy5maWx0ZXJzLmR1ZURhdGU7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRpbml0Q29tcGFueURyb3BEb3duKCkge1xyXG5cdFx0dGhpcy5fY29tcGFueUxpc3QgPSBDb25maWcuY29tcGFueUxpc3Q7XHJcblx0XHRsZXQgY291bnRlciA9IDA7XHJcblx0XHRfLmZvckVhY2godGhpcy5fY29tcGFueUxpc3QsIChjb21wYW55KSA9PiB7XHJcblx0XHRcdGlmIChjb21wYW55LmlkID09IENvbmZpZy5jb21wYW55SUQpIHtcclxuXHRcdFx0XHR0aGlzLmNvbXBhbnlEcm9wRG93bkluZGV4ID0gY291bnRlcjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbXBhbnlEcm9wRG93bkl0ZW1zLnB1c2goY29tcGFueS5jb21wYW55Q29kZSArICcgLyAnICsgY29tcGFueS5zb2NpZXR5SUQpO1xyXG5cdFx0XHRjb3VudGVyKys7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdvQmFjaygpIHtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuXHRzYXZlKCkge1xyXG5cdFx0Y29uc3Qgc2VsZWN0ZWRDb21wYW55ID0gdGhpcy5fY29tcGFueUxpc3RbdGhpcy5jb21wYW55RHJvcERvd25JbmRleF07XHJcblx0XHRDb25maWcuY29tcGFueUlEID0gc2VsZWN0ZWRDb21wYW55LmlkO1xyXG5cdFx0Q29uZmlnLnNvY2lldHlJRCA9IHNlbGVjdGVkQ29tcGFueS5zb2NpZXR5SUQ7XHJcblx0XHRcclxuXHRcdENvbmZpZy5maWx0ZXJzLnJ1bm5pbmcgPSB0aGlzLnJ1bm5pbmdTdGF0dXNfRHJvcERvd25JdGVtc1t0aGlzLnJ1bm5pbmdTdGF0dXNfRHJvcERvd25JbmRleF07XHJcblx0XHRDb25maWcuZmlsdGVycy5jb21tID0gdGhpcy5jb21tU3RhdHVzX0Ryb3BEb3duSXRlbXNbdGhpcy5jb21tU3RhdHVzX0Ryb3BEb3duSW5kZXhdO1xyXG5cdFx0Q29uZmlnLmZpbHRlcnMuYWN0aXZhdGlvbiA9IHRoaXMuYWN0aXZhdGlvblN0YXR1c19Ecm9wRG93bkl0ZW1zW3RoaXMuYWN0aXZhdGlvblN0YXR1c19Ecm9wRG93bkluZGV4XTtcclxuXHRcdENvbmZpZy5maWx0ZXJzLmR1ZURhdGUgPSB0aGlzLmR1ZURhdGVfRHJvcERvd25JdGVtc1t0aGlzLmR1ZURhdGVfRHJvcERvd25JbmRleF07XHJcblx0XHRhbGVydCgnRmlsdGVycyBzdWNjZXNzZnVsbHkgc2F2ZWQuJylcclxuXHR9XHJcbn0iXX0=