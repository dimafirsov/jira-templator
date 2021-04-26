import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jit-quick-access-card',
  templateUrl: './quick-access-card.component.html',
  styleUrls: ['./quick-access-card.component.scss']
})
export class QuickAccessCardComponent implements OnInit {

    @Input() public text = 'hello!';

    constructor() { }

    ngOnInit(): void {
    }

}
