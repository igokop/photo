import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean{
        console.log('dostęp przyznany');
        return this.authService.authorized;
    }

}