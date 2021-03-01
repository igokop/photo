import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: false } }
  ]
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    

  constructor(private breakpointObserver: BreakpointObserver) {}
  
  onNavigate(){
    window.location.href="https://www.facebook.com/pawel.rogalski.foto/about/?tab=page_info&edited=gender";
}
}
