import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaymentsService } from "../../shared/payments/payments.service";
import { formatDate, isTokenExpired } from "../../utils/utilities";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
	selector: "paymentList",
	providers: [PaymentsService],
	/*
	styleUrls: [
		"pages/payment-list/payment-list-common.css", 
		"pages/payment-list/payment-list.css"
	],
	templateUrl: "pages/payment-list/payment-list.html",
	*/
	
	styleUrls: [
		"./payment-list-common.css", 
		"./payment-list.css"
	],
	templateUrl: "./payment-list.html",
})
export class PaymentListComponent implements OnInit {
	clientVehicleID;
	clientName: string;
	vehicleName: string;
	isLoading = false;
	totalPaidAmt = 0;
	totalRecords = 0;
	paymentList = [];

	constructor(private route: ActivatedRoute
			, private paymentsService: PaymentsService
			, private routerExtensions: RouterExtensions) {
		this.route.queryParams.subscribe(params => {
			this.clientVehicleID = params["clientVehicleID"];
			this.clientName = params["clientName"];
			this.vehicleName = params["vehicleName"];
		});
	}

	checkIfTokenExpired(error) {
		if (isTokenExpired(error)) {
			alert('Token has been expired');
			this.routerExtensions.back();
			return;
		}
		alert('Error occurs upon loading data');
	}

	loadList() {
		this.isLoading = true;
		this.paymentsService.getList(this.clientVehicleID, (error, response) => {
			this.isLoading = false;
			if (error) {
				this.checkIfTokenExpired(error);
			}
			this.paymentList = (response) ? response.list : [];
			this.totalPaidAmt = (response) ? response.totalPaidAmt : 0;
			this.totalRecords = (response) ? response.totalRecords : 0;
		});
	}

	ngOnInit() {
		this.loadList();
	}

	refreshList() {
		if (!this.isLoading) {
			this.loadList();
		}
	}

	formatDateString(date) {
		return formatDate(date);
	}

	isPaymentCancelled(payment) {
		if (payment.isCancelled == 1) {
			return { isCancelled: true, status: 'cancelled' }
		}
		return { isCancelled: false, status: '' }
	}

	goBack() {
		this.routerExtensions.back();
	}
}