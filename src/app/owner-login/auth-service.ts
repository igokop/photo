import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    LocalId: string;
    registered: boolean;
}

@Injectable()
export class AuthService{
    authorized:boolean = false;

    constructor(private http:HttpClient){}

    login(email: string, password: string){
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzdps_zWHGLQMT13ZL7yPdX2n_-rhFoMQ',
        {
            email: email,
            password: password,
            returnSecureToken: true

        })
        .pipe(
            tap(returnData => {
                if(returnData.registered)
                {
                    this.authorized = true;
                }
            })
          );
    }
}