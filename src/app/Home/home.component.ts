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
    photo : any;

    options : any;
    constructor(private http: Http, private router: Router, private af: AngularFire) {

    }

    ngOnInit() {

        this.options = ['Definições', 'Logout']
        this.router.navigateByUrl('/home/turmas');

        let teacher_obs = this.af.database.list('/professores', {
            query: {
                orderByKey: true,
                equalTo: 'CKiiePZGPNQMYjUbDAW6YqIeINh1'
            }
        });
        

        teacher_obs.subscribe(res => { this.teacher = res[0]; console.log(this.teacher) });

        this.af.auth.subscribe(res => {

            this.photo = res.auth.photoURL;

        });

        }

}