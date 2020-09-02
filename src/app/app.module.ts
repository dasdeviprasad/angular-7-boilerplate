// all angular imports
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LayoutModule } from '@angular/cdk/layout';
import 'hammerjs';

// all app modules
import { MaterialModule } from './modules';
import { routing } from './app-routing.module';

// all guards
import { AuthGuard } from './guards';

// all intercepters
import { JwtInterceptor, ErrorInterceptor } from './helpers';

// all services
import { AuthenticationService, FakeAuthInterceptor } from './services';

// all components
import * as AppTranslation from './app.translate';
import { AppComponent } from './components/app.component';
import { LoginComponent, ForgotPasswordComponent, ResetPasswordComponent } from './components/auth';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationService } from './services/notification.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		NavigationComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		routing,
		HttpClientModule,
		BrowserAnimationsModule,
		NoopAnimationsModule,
		LayoutModule,
		MaterialModule, 
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: AppTranslation.loadTranslation,
				deps: [HttpClient]
			}
		}),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: FakeAuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: APP_INITIALIZER, useFactory: AppTranslation.initializerFactory,
			deps: [TranslateService, Injector],
			multi: true
		},
		AuthGuard,
		AuthenticationService, 
		NotificationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
