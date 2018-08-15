import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";

@Injectable()
export class UserService {
	httpService: HttpService;
	user: string;
	societyID: string;
	maxPage;

	constructor(private http: Http) {
		this.httpService = new HttpService(http);
	}

	authenticate(username: string, password: string, callback: Function) {
		const body = {
			Username: username,
			Password: password
		};
		return this.httpService.post('login', body)
		.subscribe(
			(response) => { callback(null, response); },
			(error) => { callback(error, null); }
		);
	}
}