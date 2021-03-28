import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [] ;
  cardsForHandset = [];
  cardsForweb = [];

  isHandset: boolean = false;
  isHansetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
       return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
   public appService : AppService ) {}
   
  ngOnInit(){
    this.isHansetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();

    });
    this.appService.getDeals().subscribe(
      response => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForweb = response.webCards;
        this.loadCards();


      },
      error => {

      }
      
    };
  }
 loadCards() {
    this.cards = this.isHandset ? this.cardsForHandset : this.cardsForweb;
  }
  getImage(imageName: strings): string{
    return 'url(' + 'http://localhost:3000/images/' + imageName + '.jpg' +')';

  }
}
