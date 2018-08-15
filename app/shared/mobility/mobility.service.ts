import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";

@Injectable()
export class MobilityService {
	httpService: HttpService;
	url: string;

	constructor(private http: Http) {
		this.url = 'mobilities';
		this.httpService = new HttpService(http);
	}

	getOne(mobilityID: string, callback: Function) {
		return this.httpService.get(this.url + '/' + mobilityID)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}

	getAll(callback: Function) {
		return this.httpService.get(this.url)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}
}