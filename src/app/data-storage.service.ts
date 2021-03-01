import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { KlienciService } from './klienci.service';
import { Klient } from './klient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private klienciService: KlienciService) { }
  getPending(){
    return this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/pending.json').pipe(map( responseData => {
        const postArray = [];
        for(const key in responseData)
        {
          if(responseData.hasOwnProperty(key)){
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray;
      }
      ), tap(userData => {
        this.klienciService.pending = userData;
      })) 
  }
}
