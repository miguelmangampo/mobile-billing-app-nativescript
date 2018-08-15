export class Config {
	static apiUrl = "https://billing-a.cloud-gms.com:61000/";
	// static apiUrl = "http://13.112.18.198:61005/";
	// static apiUrl = "http://52.68.34.6:61000/";

	static maxPage = 1000;
	static token = "";
	static societyID = "";
	static user = "";
	static companyID = 0;
	static companyList = [];
	static companyCode = '';

	static filters = {
		types: {
			running: {
				ALL: 'ALL',
				RUN: 'RUN',
				IDLING: 'IDLING',
				STOP: 'STOP',
				UNKNOWN: 'UNKNOWN',
			},
			comm: {
				ALL: 'ALL',
				COMM: 'COMM',
				NOTCOMM: 'NOTCOMM',
				SLEEP: 'SLEEP',
				UNKNOWN: 'UNKNOWN',
			},
			activation: {
				ALL: 'ALL',
				ACTIVE: 'ACTIVE',
				INACTIVE: 'INACTIVE',
				ACTIVATING: 'ACTIVATING',
				DEACTIVATING: 'DEACTIVATING',
				WAITING_TO_ACT: 'WAITING_TO_ACT',
				WAITING_TO_DEACT: 'WAITING_TO_DEACT',
				UNKNOWN: 'UNKNOWN',
				RESERVING_TO_ACTIVATE: 'RESERVING_TO_ACTIVATE',
				RESERVING_TO_DEACTIVATE: 'RESERVING_TO_DEACTIVATE',
			},
			dueDate: {
				ALL: 'ALL',
				DUE_TODAY: 'DUE_TODAY',
				WITH_PAST_DUES: 'WITH_PAST_DUES',
				NOT_DUE: 'NOT_DUE',
			}
		},

		running: 'ALL',
		comm: 'ALL',
		activation: 'ALL',
		dueDate: 'ALL',
	};
}