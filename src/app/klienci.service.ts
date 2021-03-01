
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Subject } from 'rxjs';
import { Klient } from './klient.model';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class KlienciService {

  incomingChanged = new Subject<Klient[]>();
  pendingChanged = new Subject<Klient[]>();
  wiadomosciChanged = new Subject <Message[]>();
  archiveChanged = new Subject <Message[]>();
  incoming: Klient[]=[];
  pending: Klient[]=[];
  past: Klient[]=[];
  wiadomosci: Message[]=[]
  archive: Message[]=[];
  constructor(private http:HttpClient, private datePipe: DatePipe) { }

  newMessage(message: Message){
    this.wiadomosci.push(message);
    this.wiadomosciChanged.next(this.wiadomosci.slice());
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/messages.json',this.wiadomosci).subscribe(info => console.log(info));
  }
  removeMessage(row:number){
    this.wiadomosci.splice(row,1);
    this.wiadomosciChanged.next(this.wiadomosci.slice());
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/messages.json',this.wiadomosci).subscribe(info=> console.log(info));
  }
  newArchive(i: number){
    this.archive.push(this.wiadomosci[i]);
    this.archiveChanged.next(this.wiadomosci.slice());
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/archive.json',this.archive).subscribe(info => console.log(info));
  }
  removeArchive(row:number){
    this.archive.splice(row,1);
    this.archiveChanged.next(this.archive.slice());
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/archive.json',this.archive).subscribe(info=> console.log(info));
  }

  addNewIncomingEvent(event: Klient){
    this.incoming.push(event);
    this.incomingChanged.next(this.incoming.slice())
  }
  addNewPendingEvent(row: number, event: Klient){
    this.pending.push(event);
    this.pendingChanged.next(this.pending.slice());
    this.incoming.splice(row,1);
    this.incomingChanged.next(this.incoming.slice());
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/incoming.json',this.incoming).subscribe(response=>{console.log(response)});
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/pending.json',this.pending).subscribe(response=>{console.log(response)});
  }
  deleteIncomingEvent(row: number){
    this.incoming.splice(row,1);
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/incoming.json',this.incoming).subscribe(response=>{console.log(response)});
    this.incomingChanged.next(this.incoming.slice())
  }
  deletePendingEvent(row: number){
    this.pending.splice(row,1);
    this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/pending.json',this.pending).subscribe(response=>{console.log(response)});
    this.pendingChanged.next(this.pending.slice());
   
  }

  checkDates(){
    for(let i=0; i<this.pending.length; i++)
    {
      const todayDateTo = new Date();
      let todayDate = this.datePipe.transform(todayDateTo,"yyyy-MM-dd");
      // console.log(Date.parse(this.pending[i].data));
      // console.log(Date.parse(todayDate));
      if(Date.parse(this.pending[i].data) < Date.parse(todayDate)){
        this.past.push(this.pending[i]);
        this.pending.splice(i, 1);
        this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/pending.json',this.pending).subscribe(response=>{console.log(response)});
        this.http.put('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/past.json',this.past).subscribe(response=>{console.log(response)});
      }
      for(let j=0; j<this.pending.length; j++)
      {
        if(this.pending[i]===this.pending[j])
        {
          this.pending[i].godzina = 'calyDzien';
          this.pending[j].godzina = 'calyDzien';
        }
      }
    }
    
  }
}