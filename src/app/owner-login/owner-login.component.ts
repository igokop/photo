import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { KlienciService } from '../klienci.service';
import { Klient } from '../klient.model';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {
  loginData: FormGroup;
  constructor(private authService:AuthService, private router:Router, private klienciService: KlienciService, private http:HttpClient) { }

  ngOnInit(): void {
    this.loginData = new FormGroup({
      'email': new FormControl (null),
      'password': new FormControl (null),
    });
  }

  onSubmit(){
    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/pending.json').pipe(map( responseData => {
      const postArray = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key], id: key })
        }
      }
      return postArray;
    }
    )).subscribe(userData =>
    {
      this.klienciService.pending = userData;
    });
    
    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/past.json').pipe(map( responseData => {
      const postArray = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key], id: key })
        }
      }
      return postArray;
    }
    )).subscribe(userData =>
    {
      this.klienciService.past = userData;
    });

    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/incoming.json').pipe(map( responseData => {
      const postArray = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key], id: key })
        }
      }
      return postArray;
    }
    )).subscribe(userData =>
    {
      this.klienciService.incoming = userData;
    });


    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/messages.json').pipe(map( responseData => {
      const postArray = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key], id: key })
        }
      }
      return postArray;
    }
    )).subscribe(userData =>
    {
      this.klienciService.wiadomosci = userData;
    });

    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/archive.json').pipe(map( responseData => {
      const postArray = [];
      for(const key in responseData)
      {
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key], id: key })
        }
      }
      return postArray;
    }
    )).subscribe(userData =>
    {
      this.klienciService.archive = userData;
    });


    this.authService.login(this.loginData.value.email, this.loginData.value.password).subscribe(
      returnData => {
        console.log(returnData);
        if(returnData.registered)
        {
          this.router.navigate(['/owner'])
        }

      }
    )
    
  }

}
