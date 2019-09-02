import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent {

  show = false;

  constructor() { }

  toggleCollapse() {
    this.show = !this.show
  }
}
