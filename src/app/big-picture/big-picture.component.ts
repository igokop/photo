import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-big-picture',
  templateUrl: './big-picture.component.html',
  styleUrls: ['./big-picture.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class BigPictureComponent implements OnInit {
@Input() photo: string;
@Input() message: string;
@Output() close = new EventEmitter<void>();
@Output() next = new EventEmitter<void>();
@Output() previous = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  closeIt(){
    this.close.emit();
  }
  
  nextPhoto(){
    this.next.emit();
  }

  previousPhoto(){
    this.previous.emit();
  }
}
