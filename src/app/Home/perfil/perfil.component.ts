import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';

@Component({
    selector: 'perfil',
    templateUrl: 'perfil.component.html',
    styleUrls: ['perfil.css']
})
export class PerfilComponent implements OnInit {
    professor: any;
    user: any;
    constructor(public af: AngularFire, private http: Http) { }

    ngOnInit() {

        this.af.auth.subscribe(res => {

            this.user = res;

            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '.json').
                map(res => res).subscribe(data => {
                    this.professor = data.json();
                    console.log(this.professor)
                });

        });
    }
}