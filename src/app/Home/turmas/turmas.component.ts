import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
@Component({
    selector: 'turmas',
    templateUrl: 'turmas.component.html'
})


export class TurmasComponent implements OnInit {
    body: any;
    user: any;
    email: any;
    teacher: any;
    class_name: any;
    disciplinas: FirebaseListObservable<any[]>;
    constructor(public af: AngularFire, private http: Http, private router: Router) { }

    ngOnInit() {

        this.af.auth.subscribe(res => {

            console.log(res);
            this.user = res;
            console.log(this.user.uid);

            this.disciplinas = this.af.database.list('/turmas', {
                query: {
                    orderByChild: "professor",
                    equalTo: this.user.uid
                }
            });
        });

        let teacher_obs = this.af.database.list('/professores', {
            query: {
                orderByKey: true,
                equalTo: 'CKiiePZGPNQMYjUbDAW6YqIeINh1'
            }
        });

        teacher_obs.subscribe(res=> { this.teacher = res[0]; console.log(this.teacher)});

        


    }

    goto(nome) {
        this.router.navigateByUrl('/home/turma/' + nome + '/feed')
    }

    add() {

        this.body = {

            nome: this.class_name,
            professor: this.user.uid

        }


        this.http.post('https://caderneta-2b6e4.firebaseio.com/turmas.json', this.body)
            .map(res => res.json())
            .subscribe(
            data => { this.class_name = "" },
            err =>
                () => console.log('complete')
            );



    }



}
