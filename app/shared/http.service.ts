import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Config } from "./config";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {
	generatedUrl: string;
	headers: Headers

	constructor(private http: Http) {
		this.generatedUrl = Config.apiUrl;
		this.headers = new Headers();
		this.headers.append("Content-Type", "application/json");
		this.headers.append("Authorization", "GMSAuth " + Config.token);
	}

	get(url) {
		return this.http.get(this.generatedUrl + url, {
			headers: this.headers
		})
		.map(res => res.json())
		.map(data => {
			return data;
		})
		.catch(this.handleErrors);
	}

	post(url: string, bodyParam){
		return this.http.post(
			this.generatedUrl + url
			, JSON.stringify(bodyParam)
			, { headers: this.headers }
		)
		.map(res => res.json())
		.map(data => {
			return data;
		})
		.catch(this.handleErrors);
	}

	handleErrors(error: Response) {
		console.log(JSON.stringify(error.json()));
		return Observable.throw(error);
	}
}
