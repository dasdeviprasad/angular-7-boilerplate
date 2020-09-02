import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;

	public email: string = '';
	public password: string = '';

	constructor(
		private fb: FormBuilder,
		public authService: AuthenticationService, 
		private notification: NotificationService,
		public router: Router) { 
	}

	ngOnInit() {
		this.setupLoginForm();

		if(this.authService.isLoggedIn()) {
			this.router.navigate(['/home']);
		}
	}

	private setupLoginForm() {
		this.loginForm = this.fb.group({
			email: new FormControl(''),
			password: new FormControl(''),
		});
	}

	onLogIn() {
		if(this.loginForm.invalid) { return; }
		
		const formData = this.loginForm.value;

		this.authService.login(formData.email, formData.password)
		.subscribe(res => {
			if(Array.isArray(res)) {
				this.notification.showError(res[0]);
			} else {
				this.router.navigate(['/']);
			}
		}, error => {
			this.notification.showError('Invalid Credentials!');
			console.error(error);
		} );
	}
}
