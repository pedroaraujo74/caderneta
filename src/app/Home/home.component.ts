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
    user: any;
    options: any;
    constructor(private http: Http, private router: Router, private af: AngularFire) {

    }

    ngOnInit() {

        this.options = ['Definições', 'Logout']
        this.router.navigateByUrl('/home/turmas');


        this.af.auth.subscribe(res => {

            this.user = res;
            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '.json')
                .map(res => res).subscribe(data => {
                    this.teacher = data.json();
                    this.photo = this.teacher.photoUrl;
                });

        });

    }

    logout() {

    
            this.router.navigateByUrl('/login');

    

    }

}