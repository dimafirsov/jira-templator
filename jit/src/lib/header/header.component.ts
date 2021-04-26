import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    public navigate(): void {
        this.router.navigate(['jira-templator-settings']);
    }

}
