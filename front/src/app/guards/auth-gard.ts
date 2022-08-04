import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";



@Injectable({
    providedIn: 'root'
})
export class AuthGard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        
        ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const connexion = this.authService.isConnected(); 

        if (connexion != true){
            return this.router.navigate(["/login"])
        }
    
        return true;
    }

        
}