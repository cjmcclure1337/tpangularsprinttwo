import { Component } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  event$
  title: string = "AngularSprintTwo";
  showWelcome: boolean = true;
  darkMode: boolean = true;

  // constructor to handle init variables in app
  // use dependency injection for the router so we can keep track of the current route
  constructor(private router: Router){
    if(localStorage.getItem('darkMode')){
      this.darkMode = (localStorage.getItem('darkMode') === "true");
    }
    this.event$
      =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.setShowWelcome(event.url);
              }
            });
  }
  // check if welcome message should be shown
  setShowWelcome(strUrl: string): void{
    this.showWelcome = strUrl === "/";
  }
  // locally store theme setting
  setTheme(): void{
    localStorage.setItem('darkMode', this.darkMode.toString());
  }
  // unsubscribe from event to clear resources
  ngOnDestroy() {
    this.event$.unsubscribe();
  }
}
