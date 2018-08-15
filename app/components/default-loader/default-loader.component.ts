import { Component, ElementRef, ViewChild, Input } from "@angular/core";

@Component({
	selector: "DefaultLoaderComponent",
	providers: [],
	/*
	templateUrl: "components/default-loader/default-loader.html",
	styleUrls: [
		"components/default-loader/default-loader.common.css", 
		"components/default-loader/default-loader.css",
	],
	*/
	
	templateUrl: "./default-loader.html",
	styleUrls: [
		"./default-loader.common.css", 
		"./default-loader.css",
	],
})
export class DefaultLoaderComponent {
	@Input() isVisible;
}