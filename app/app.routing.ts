import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PaymentListComponent } from "./pages/payment-list/payment-list.component";
import { DeviceDetailsComponent } from "./pages/device-details/device-details.component";
import { MapComponent } from "./pages/map/map.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { FiltersComponent } from "./pages/filters/filters.component";

export const routes = [
	{ path: "", component: LoginComponent },
	{ path: "dashboard", component: DashboardComponent },
	{ path: "paymentList", component: PaymentListComponent },
	{ path: "deviceDetails", component: DeviceDetailsComponent },
	{ path: "mapDevices", component: MapComponent },
	{ path: "settings", component: SettingsComponent },
	{ path: "filters", component: FiltersComponent },
];

export const navigatableComponents = [
	LoginComponent,  
	DashboardComponent,
	PaymentListComponent,
	DeviceDetailsComponent,
	MapComponent,
	SettingsComponent,
	FiltersComponent,
];