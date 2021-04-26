import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jit-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    public temp = 'Hello!'
;
    constructor() { }

    ngOnInit(): void {
    }

}
