import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  constructor(private viewPortScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  goToBottom(el: HTMLElement){
    // document.querySelector('.mat-sidenav-content').scrollTo({
    //   top: 100,
    //   left: 0,
    //   behavior: 'smooth'
    // });
    
      el.scrollIntoView({behavior: "smooth"});
  
    console.log('test')
  }
}
