"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
var config_1 = require("../shared/config");
function mergeArray(mainArray, subArray, mainKey, subKey, newProperty, subProperty) {
    return _.map(mainArray, function (item) {
        item[newProperty] = _.find(subArray, function (o) {
            return item[mainKey] == o[subKey];
        })[subProperty];
        return item;
    });
}
exports.mergeArray = mergeArray;
function formatDatetime(date) {
    return moment(date).format('YYYY-MM-DD, h:mm a');
}
exports.formatDatetime = formatDatetime;
function formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
}
exports.formatDate = formatDate;
function isCompanyOrigin() {
    return (config_1.Config.companyCode == 'GMSP');
}
exports.isCompanyOrigin = isCompanyOrigin;
function isTokenExpired(error) {
    if (error
        && error._body
        && error.status
        && error._body.msg == 'Invalid Token!'
        && error.status == 401) {
        return true;
    }
    return false;
}
exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQTRCO0FBQzVCLCtCQUFpQztBQUNqQywyQ0FBMEM7QUFFMUMsb0JBQTJCLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVztJQUN4RixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxJQUFJO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVBELGdDQU9DO0FBRUQsd0JBQStCLElBQUk7SUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRkQsd0NBRUM7QUFFRCxvQkFBMkIsSUFBSTtJQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNDLE1BQU0sQ0FBQyxDQUFDLGVBQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUZELDBDQUVDO0FBRUQsd0JBQStCLEtBQUs7SUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSztXQUNMLEtBQUssQ0FBQyxLQUFLO1dBQ1gsS0FBSyxDQUFDLE1BQU07V0FDWixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxnQkFBZ0I7V0FDbkMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNkLENBQUM7QUFWRCx3Q0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQXJyYXkobWFpbkFycmF5LCBzdWJBcnJheSwgbWFpbktleSwgc3ViS2V5LCBuZXdQcm9wZXJ0eSwgc3ViUHJvcGVydHkpIHtcblx0cmV0dXJuIF8ubWFwKG1haW5BcnJheSwgKGl0ZW0pID0+IHtcblx0XHRpdGVtW25ld1Byb3BlcnR5XSA9IF8uZmluZChzdWJBcnJheSwgKG8pID0+IHtcblx0XHRcdHJldHVybiBpdGVtW21haW5LZXldID09IG9bc3ViS2V5XVxuXHRcdH0pW3N1YlByb3BlcnR5XTtcblx0XHRyZXR1cm4gaXRlbTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRldGltZShkYXRlKSB7XG5cdHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdZWVlZLU1NLURELCBoOm1tIGEnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuXHRyZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wYW55T3JpZ2luKCkge1xuXHRyZXR1cm4gKENvbmZpZy5jb21wYW55Q29kZSA9PSAnR01TUCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb2tlbkV4cGlyZWQoZXJyb3IpIHtcblx0aWYgKGVycm9yXG5cdFx0JiYgZXJyb3IuX2JvZHlcblx0XHQmJiBlcnJvci5zdGF0dXNcblx0XHQmJiBlcnJvci5fYm9keS5tc2cgPT0gJ0ludmFsaWQgVG9rZW4hJ1xuXHRcdCYmIGVycm9yLnN0YXR1cyA9PSA0MDEpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuXG4iXX0=