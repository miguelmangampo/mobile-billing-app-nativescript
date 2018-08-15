import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Config } from "../config";

@Injectable()
export class ClientVehicleService {
	httpService: HttpService;
	user: string;
	societyID: string;
	maxPage;

	constructor(private http: Http) {
		this.httpService = new HttpService(http);
		this.user = Config.user;
		this.societyID = Config.societyID;
		this.maxPage = Config.maxPage;
	}

	getList(callback: Function) {
		const endpoint = Config.user + '/api/societies/' 
					+ Config.societyID + '/client-vehicle-summary'
					+ '?pageNumber=1&pageSize=' + Config.maxPage
					+ '&companyID=' + Config.companyID;

		return this.httpService.get(endpoint)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}
}