import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  isOpen:boolean = false;
  constructor(public route: Router){

  }
  logout(){
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
