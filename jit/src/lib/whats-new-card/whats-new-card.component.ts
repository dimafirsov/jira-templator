import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jit-whats-new-card',
  templateUrl: './whats-new-card.component.html',
  styleUrls: ['./whats-new-card.component.scss']
})
export class WhatsNewCardComponent implements OnInit {
    public date: Date = new Date();
    public showCloseIcon = true;

    constructor() { }

    ngOnInit(): void {
    }

    public closeWhatsNew(): void {
        this.showCloseIcon = !this.showCloseIcon;
    }

}
