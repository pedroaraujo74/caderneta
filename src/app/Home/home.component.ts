import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})


export class HomeComponent implements OnInit {

    teacher: any;
    photo: any;

    options: any;
    constructor(private http: Http, private router: Router, private af: AngularFire) {

    }

    ngOnInit() {

        this.options = ['Definições', 'Logout']
        this.router.navigateByUrl('/home/turmas');


        this.af.auth.subscribe(res => {

            this.photo = res.auth.photoURL;

        });

    }

    logout() {

        this.af.auth.subscribe(res => {

            this.af.auth.logout();
            this.router.navigateByUrl('/login');
        });

    }

}