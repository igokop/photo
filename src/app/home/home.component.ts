import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { map } from 'rxjs/operators';
import { KlienciService } from '../klienci.service';
import { Klient } from '../klient.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  constructor(private klienciService: KlienciService, private http: HttpClient) { }

  ngOnInit(): void {
    
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
      this.klienciService.checkDates();
    });
    
  }

}
