import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Config } from "../config";

@Injectable()
export class ServiceEntityService {
	httpService: HttpService;

	constructor(private http: Http) {
		this.httpService = new HttpService(http);
	}

	getOne(serviceEntityID, callback: Function) {
		const endpoint = Config.user + '/api/societies/'
						+ Config.societyID + '/service-entities/'
						+ serviceEntityID;

		return this.httpService.get(endpoint)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}

	activation(serviceEntityID, status: string, reservation: boolean, callback: Function) {
		const endpoint = Config.user + '/api/societies/'
						+ Config.societyID + '/service-entities/'
						+ serviceEntityID + '/activation'

		const body = { 
			operation: status,
			reservation: reservation,
		};
		return this.httpService.post(endpoint, body)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}
}
