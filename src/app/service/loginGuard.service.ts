import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LoginStatusService } from "./loginStatus.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private loginService: LoginStatusService, private router : Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated)
                    return true;
                else
                   this.router.navigate(['/']);
            }
        );  
    }
}