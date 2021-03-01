
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { KlienciService } from '../klienci.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
userData: FormGroup;
informacja: boolean=false;
  constructor(private emailService: EmailService, private klienciService: KlienciService) { }

  ngOnInit(): void {
    this.userData = new FormGroup({
      'name': new FormControl (null, Validators.required),
      'email': new FormControl (null, Validators.required),
      'message': new FormControl (null, Validators.required)
    });
  }
onSubmit(){
  let email = 'igor.kopaczewski@int.pl'
  let EmailKlienta = this.userData.value.email;
  let name = this.userData.value.name;
  let message = this.userData.value.message + ' '+name;
  let reqObj ={
    email:email,
    //name:'Nowy kontakt: ' + name +' '+ EmailKlienta,
    message:message,
    title: 'Wiadomość od klienta ' + EmailKlienta
  }
  this.emailService.sendMessage(reqObj).subscribe(data => console.log(data))
  console.log(this.informacja)
  this.informacja=true;
  setTimeout(this.informacjaSwitch, 4000);
  console.log(this.informacja)
  
  //wysylanie bezposrednio do tablicy ktora zostanie wyswietlona w panelu administracyjnym, problem z CORSem do wysylania maili.
  
  this.klienciService.newMessage(this.userData.value);
  this.userData.reset();

}

informacjaSwitch(){
  this.informacja=false;
  console.log(this.informacja);
}
}