import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmailService } from '../email.service';
import { KlienciService } from '../klienci.service';
import { Klient } from '../klient.model';
import { Message } from '../message.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  incoming: Klient[]=[];
  pending: Klient[]=[];
  past: Klient[]=[]; 
  wiadomosci: Message[];
  archive: Message[];
  alertOpen = false;
  alertPendingOpen = false;
  i: number;
  j: number;
  radioButtons: FormGroup;
  listaOpen: boolean = false;
  listaOpenArchive: boolean = false;
  godziny= ['rano', 'wieczor', 'caly dzien'];
  constructor(private klienciService:KlienciService, private http: HttpClient, private emailService: EmailService) { }
  ngOnInit(){
    this.radioButtons = new FormGroup({
      'godzina': new FormControl (null)
    });
    this.klienciService.checkDates();
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
      this.incoming = userData;
      this.klienciService.incoming = userData;
    });

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
      this.pending = userData;
      this.klienciService.pending = userData;
      console.log(this.klienciService.pending)
    });

    this.wiadomosci = this.klienciService.wiadomosci;
    console.log(this.klienciService.wiadomosci)
    this.klienciService.wiadomosciChanged.subscribe(wiadomosci => {
      this.wiadomosci=wiadomosci;
    })

    this.archive = this.klienciService.archive;
    this.klienciService.archiveChanged.subscribe(archive => {
      this.archive = archive;
    })

    this.past = this.klienciService.past;
    this.klienciService.incomingChanged.subscribe(incoming => {
      this.incoming=incoming;
    })
    this.klienciService.pendingChanged.subscribe(pending => {
      this.pending=pending;
    })
  }

  deleteIncoming(){
    this.klienciService.deleteIncomingEvent(this.i);
    this.alertOpen = false;
  }

  addPending(i:number, el:Klient){
    //dodaj tu wartosc godziny do pchanego elementu
    const ele = el;
    ele.godzina = this.radioButtons.value.godzina;
    this.klienciService.addNewPendingEvent(i,ele);
    console.log(ele);


    let email = el.email;
    let reqObj ={
      email:email,
      title: 'Pawel Rogalski Photography',
      message: 'Twój termin ' + el.data + ' został zaakceptowany, widzimy się! Paweł :-)'
    }
    this.emailService.sendMessage(reqObj).subscribe(data => console.log(data))

  }
  deletePending(){
    this.klienciService.deletePendingEvent(this.j);
    this.alertPendingOpen = false;
  }
  openAlert(i:number){
    this.i = i;
    this.alertOpen = true;
  }
  openAlertPending(j: number){
    this.j = j;
    this.alertPendingOpen = true;
  }
  closed(){
    this.alertOpen = false;
    this.alertPendingOpen = false;
  }
  reload(){
    //reload
    this.klienciService.checkDates();


    //pending
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
      this.pending = userData;
      this.klienciService.pending = userData;
    });


    //incoming
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
      this.incoming = userData;
      this.klienciService.incoming = userData;
    });


    //past
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
      this.past = userData;
      this.klienciService.past = userData;
    });

    //update tables, reload past pending incoming, reload calendar jakos
    //update messagess
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
      this.wiadomosci = userData;
      this.klienciService.wiadomosci = userData;
    });
    //update archive
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
      this.archive = userData;
      this.klienciService.archive = userData;
    });
  }
  
  openList(){
    this.listaOpen = !this.listaOpen;
  }

  openListArchive(){
    this.listaOpenArchive = !this.listaOpenArchive;
  }

  moveToArchive(i: number){
    this.klienciService.newArchive(i);
    this.klienciService.removeMessage(i);
  }

}
