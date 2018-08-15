import * as _ from 'lodash';
import * as moment from 'moment';
import { Config } from "../shared/config";

export function mergeArray(mainArray, subArray, mainKey, subKey, newProperty, subProperty) {
	return _.map(mainArray, (item) => {
		item[newProperty] = _.find(subArray, (o) => {
			return item[mainKey] == o[subKey]
		})[subProperty];
		return item;
	});
}

export function formatDatetime(date) {
	return moment(date).format('YYYY-MM-DD, h:mm a');
}

export function formatDate(date) {
	return moment(date).format('YYYY-MM-DD');
}

export function isCompanyOrigin() {
	return (Config.companyCode == 'GMSP');
}

export function isTokenExpired(error) {
	if (error
		&& error._body
		&& error.status
		&& error._body.msg == 'Invalid Token!'
		&& error.status == 401) {
		return true;
	}

	return false;
}


