import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild, EventEmitter, Renderer2 } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map } from 'rxjs/operators';
import { KlienciService } from 'src/app/klienci.service';
import { Klient } from 'src/app/klient.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  @Output() emiting = new EventEmitter<Date>();
  selectedDate: Moment;
  dates: string[]=[];
  klienci: Klient[]=[];
  constructor(private renderer:Renderer2, private klienciService: KlienciService,private datePipe: DatePipe, private http:HttpClient) { }

 
  ngOnInit(): void {
    this.klienciService.pendingChanged.subscribe(pending => {
      this.klienci=pending;
      const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
    for(let i=0; i<this.klienci.length; i++)
    {
      const data = this.datePipe.transform(this.klienci[i].data, 'LLLL d, yyyy');
      this.dates.push(data);
      console.log('ilerazy')

    }
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.updateCalendarView(this.dates);
        });
      });
    }
    this.updateCalendarView(this.dates);
    
    })
  }
  emit(){
    let newDate = new Date(this.selectedDate.year(), this.selectedDate.month(),this.selectedDate.date());
    this.emiting.emit(newDate);
  }
  

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
    for(let i=0; i<this.klienciService.pending.length; i++)
    {
      const data = this.datePipe.transform(this.klienciService.pending[i].data, 'LLLL d, yyyy');
      this.dates.push(data);

    }
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.updateCalendarView(this.dates);
        });
      });
    }
    this.updateCalendarView(this.dates);
    
  }
    
    updateCalendarView(days: string[]) {
    this.highlightCalendar(days);
    }
    
    private highlightCalendar(days: string[]) {
    let dayElements = document.querySelectorAll('.mat-calendar-table .mat-calendar-body-cell');
    Array.from(dayElements).forEach(element => {
    let dayContainsActivity: boolean = false;
    let j:number = 0;
      for(let i=0;i<days.length;i++)
      {
        if(element.getAttribute("aria-label") === days[i]){
          dayContainsActivity = true;
          j=i;
        }
      }



    if (dayContainsActivity) {
      if(this.klienciService.pending[j].godzina === 'rano'){
        this.renderer.setStyle(element,'background-color', 'rgb(84, 141, 194)')
        this.renderer.setStyle(element,'border-radius', '999px')
      }
      else if(this.klienciService.pending[j].godzina === 'wieczor'){
        this.renderer.setStyle(element,'background-color', 'rgb(97, 204, 231)')
        this.renderer.setStyle(element,'border-radius', '999px')
      }
      else if(this.klienciService.pending[j].godzina === 'calyDzien'){
        this.renderer.setStyle(element,'background-color', 'rgb(127, 134, 151)')
        this.renderer.setStyle(element,'border-radius', '999px')
      }
      
    // this.renderer.setValue(element, 'disabled')
    } else {
    this.renderer.removeStyle(element,'background-color');
    this.renderer.removeStyle(element, 'border-radius');
    // this.renderer.setAttribute(element, 'disabled', 'false')
    }
    });
    }
}