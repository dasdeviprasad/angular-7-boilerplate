import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	isOpenNav: boolean = false;
	constructor(
		public authService: AuthenticationService, 
		public notificationService: NotificationService, 
		public router: Router
	) { }

	ngOnInit() {
	}

	logout() {
		this.notificationService.showInfo('Logged out');
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
