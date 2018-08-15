import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { TextField } from "ui/text-field";

import { Config } from "../../shared/config";
import { UserService } from "../../shared/user/user.service";

@Component({
	selector: "my-app",
	providers: [UserService],
	/*
	templateUrl: "pages/login/login.html",
	styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
	*/
	
	templateUrl: "./login.html",
	styleUrls: ["./login-common.css", "./login.css"]
})
export class LoginComponent implements OnInit {
	user = {
		username: '',
		password: ''
	};
	isLoading = false;

	constructor(private router: Router
			, private page: Page
			, private userService: UserService) {
		this.page.actionBarHidden = true;
	}

	ngOnInit() {
		this.user.username = '';
		this.user.password = '';
	}

	login() {
		this.isLoading = true;
		this.userService.authenticate(this.user.username, this.user.password, (error, response) => {
			this.isLoading = false;
			if (error) {
				const errMsg = (error._body && error._body.msg) ? error._body.msg : 'Error upon login, please check your internet connection.'
				alert(errMsg);
				return;
			} 

			Config.token = response.token;
			Config.user = response.user;
			Config.societyID = response.gmsContractID;
			Config.companyID = response.companyID;
			Config.companyCode = response.companyCode;
			this.user.password = '';
			this.router.navigate(["/dashboard"]);
		});
	}
}