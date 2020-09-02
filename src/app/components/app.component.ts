import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	private loadingSub: Subscription;
	private successSub: Subscription;
	private errorSub: Subscription;
	private infoSub: Subscription;

	isLoading = false;

	constructor(
		public authService: AuthenticationService, 
		private notificationService: NotificationService,
		public router: Router, 
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.subscribeToData();
	}

	ngOnDestroy() {
		if(this.loadingSub) { this.loadingSub.unsubscribe() }
		if(this.successSub) { this.successSub.unsubscribe() }
		if(this.infoSub) { this.infoSub.unsubscribe() }
		if(this.errorSub) { this.errorSub.unsubscribe() }
	}

	private subscribeToData() {
		this.loadingSub = this.notificationService.loading.subscribe(isLoading => {
			this.isLoading = isLoading;
		});

		this.infoSub = this.notificationService.info.subscribe(message => {
			this.showMessage(message, 'snackbar-info');
		});

		this.successSub = this.notificationService.success.subscribe(message => {
			this.showMessage(message, 'snackbar-success');
		});

		this.errorSub = this.notificationService.error.subscribe(message => {
			this.showMessage(message, 'snackbar-error', 3000);
		});
	}

	private showMessage(message: string, className: string, duration: number = 2000) {
		if(message && message.length > 0) {
			this.snackBar.open(message, '', {
				panelClass: className, 
				duration: duration,
				verticalPosition: 'top'
			});
		}
	}
}
