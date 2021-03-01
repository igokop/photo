import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu-old',
  templateUrl: './menu-old.component.html',
  styleUrls: ['./menu-old.component.css']
})
export class MenuOldComponent{
  clicked = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    cli(){
      this.clicked=!this.clicked;
    }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
