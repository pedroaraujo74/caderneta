import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
@Component({
    selector: 'discipinas',
    templateUrl: 'disciplinas.component.html'
})


export class DisciplinasComponent implements OnInit {
    body: any;
    user: any;
    email: any;

    disciplinas: FirebaseListObservable<any[]>;
    constructor(public af: AngularFire, private http: Http, private router: Router) { }

    ngOnInit() {

        this.af.auth.subscribe(res => {

            console.log(res);
            this.user = res;
            console.log(this.user.uid);

            this.disciplinas = this.af.database.list('/disciplinas', {
                query: {
                    orderByChild: "professor",
                    equalTo: this.user.uid
                }
            });
        });






    }

    goto(nome) {
        this.router.navigateByUrl('/home/disciplina/' + nome)
    }

    add() {

        this.body = {

            nome: "Português",
            professor: this.user.uid

        }

        this.http.post('https://caderneta-2b6e4.firebaseio.com/disciplinas.json', this.body)
            .map(res => res.json())
            .subscribe(
            data => console.log(data.name),
            err =>
                () => console.log('complete')
            );



    }



}
