import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private service: AuthService, private router: Router){}

  canActivate(){
    console.log("Is logged in in Guard " + this.service.isLoggedIn());
    console.log(typeof(this.service.isLoggedIn()));
    
      if(this.service.isLoggedIn() == false){
        console.log("please login");
        
        this.router.navigateByUrl("/login")
      return false;

    }else{
      console.log("You are logged in");
      
      return true;

    }
    
  }
  
}
