import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'jit-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    public text!: string;

    @HostBinding('class.success') public success = false;
    @HostBinding('class.warning') public warning = false;
    @HostBinding('class.error') public error = false;

    constructor(public el: ElementRef) { }

    ngOnInit(): void {
    }

}
