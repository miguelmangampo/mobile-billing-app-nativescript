import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Config } from "../config";

@Injectable()
export class CompanyService {
	httpService: HttpService;

	constructor(private http: Http) {
		this.httpService = new HttpService(http);
	}

	getList(callback: Function) {
		const endpoint = 'companies-by-page'
					+ '?pageNumber=1&pageSize=' + Config.maxPage;

		return this.httpService.get(endpoint)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}
}