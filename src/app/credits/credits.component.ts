import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.less']
})
export class CreditsComponent implements OnInit {

  currentDate = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
