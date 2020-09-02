import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  
   constructor(public router: Router) { }

   canActivate() {
	   if (localStorage.getItem('user')) {
	       // logged in so return true
	       return true;
	   }	   
	   
	   // Not logged in so redirect to login page

	   //localStorage.clear();
	   //this.router.navigate(['/login']);
	   return true;
	}
}
