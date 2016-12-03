import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})


export class HomeComponent implements OnInit {

    user: any;
    email: any;
    disciplinas: any;




    constructor(private http: Http, private router: Router) {

    }

     ngOnInit() {
        this.router.navigateByUrl('/home/disciplinas')
    }

}