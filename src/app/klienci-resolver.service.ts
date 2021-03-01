import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { DataStorageService } from "./data-storage.service";
import { KlienciService } from "./klienci.service";
import { Klient } from "./klient.model";

@Injectable({providedIn: 'root'})
export class KlienciResolverService implements Resolve<Klient[]>{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataStorageService.getPending();
    }

}