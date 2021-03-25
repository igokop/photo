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
  i:number = 0;
  pictureView = false;
  photo: string;
  galleryOne = ['/assets/images/slub1.jpg', '/assets/images/koncert2.jpg'];
  galleryTwo = ['/assets/images/koncert1.jpg', '/assets/images/koncert2.jpg'];
  galleryThree = ['/assets/images/sport1.jpg', '/assets/images/sport2.jpg'];
  galleryFour = ['/assets/images/sesja1.jpg', '/assets/images/sesja2.jpg'];
  gallery = ['/assets/images/slub1.jpg', '/assets/images/slub2.jpg',
  '/assets/images/koncert1.jpg', '/assets/images/koncert2.jpg',
  '/assets/images/sport1.jpg', '/assets/images/sport2.jpg',
  '/assets/images/sesja1.jpg', '/assets/images/sesja2.jpg'];

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

  openBigPicture(i){
    this.photo = this.gallery[i];
    this.i = i;
    this.pictureView = true;
  }

  closeBigPicture(){
    this.pictureView = !this.pictureView;
    this.i = 0;
  }

  nextBigPicture(){
    if( this.i+1 < this.gallery.length){
      const i=this.i + 1;
      this.openBigPicture(i);
    }
  }

  previousBigPicture(){
    if( this.i > 0){
      const i=this.i - 1;
      this.openBigPicture(i);
    }
  }

}
