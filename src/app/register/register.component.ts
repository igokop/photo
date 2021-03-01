import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { KlienciService } from '../klienci.service';
import { HttpClient } from '@angular/common/http';
import { Klient } from '../klient.model';
import { map } from 'rxjs/operators';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData: FormGroup;
  constructor(private emailService: EmailService, private datePipe: DatePipe, private klienciService: KlienciService, private http: HttpClient) { }
  data: Date;
  informacja: boolean = false;
  ngOnInit(): void {
    this.userData = new FormGroup({
      'email': new FormControl (null, Validators.required),
      'telefon': new FormControl (null, Validators.required),
      'miasto': new FormControl (null, Validators.required),
      'data': new FormControl (null, Validators.required),
      'typ': new FormControl (null, Validators.required),
      'accepted': new FormControl (null, Validators.required),
      'pytania': new FormControl (null),
      'godzina': new FormControl (null, Validators.required)

    });
    this.userData.patchValue({
      'accepted': false,
      'godzina': 'nieprzypisane'
    })
  }
  toForm(data: Date){
    let todayDate = this.datePipe.transform(data,"yyyy-MM-dd");
    this.userData.patchValue({
      'data': todayDate
    })
  }

  onSubmit(){
    this.klienciService.addNewIncomingEvent(this.userData.value);
    this.http.post('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/incoming.json',this.userData.value).subscribe(response=>{console.log(response)});

    let telefon = this.userData.value.telefon;
    let miasto = this.userData.value.miasto;
    let okazja = this.userData.value.typ;
    let email = this.userData.value.email;
    let message2 = 'Cześć! Juz sprawdzam czy podołam! Oczekuj na maila z potwierdzeniem. Mam nadzieje, ze się widzimy! Paweł :-)'
    let message = 'Nowy klient na ' + this.userData.value.data + '! Wejdź do aplikacji zeby zobaczyc wiecej szczegolow! Wiadomosc od klienta: ' + this.userData.value.pytania + '. Kontakt: ' + email +' '+telefon;
    
    let reqObj = {
    //name:'Nowy klient! Mail: '+ email + ' Telefon: ' + telefon + '. Wiadomość od klienta: '+ ,
    email: 'igor.kopaczewski@int.pl',
    title: 'Zgłoszenie: '+okazja + ' ' + miasto,
    message: message
    }

    let reqObj2 = {
      email: email,
      message: message2,
      title: 'Pawel Rogalski Photography',
    }

    this.emailService.sendMessage(reqObj).subscribe(data => console.log('Dane z backendu: ' + data))
    this.emailService.sendMessage(reqObj2).subscribe(data => console.log('Dane z backendu: ' + data))
    this.userData.reset();
    this.informacja=true;
    setTimeout(this.informacjaSwitch,3000);
    console.log(this.informacja)
  }
  informacjaSwitch(){
    this.informacja=false;
    console.log(this.informacja);
  }
  afterViewInit(){
    this.http.get<Klient[]>('https://pawelrogalskiphotography-default-rtdb.firebaseio.com/incoming.json').subscribe(data =>{
      this.klienciService.incoming = data;
      console.log(this.klienciService.incoming);
    })
    this.klienciService.checkDates();
    console.log(this.klienciService.incoming);
  }
}
