import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Event } from './turma.interface'

@Component({
    selector: 'turma',
    templateUrl: 'turma.component.html',
    styleUrls: ['turma.css']
})


export class TurmaComponent implements OnInit {
    body: any;
    sub: any;
    id: any
    user: any;
    email: any;
    disciplina: FirebaseListObservable<any[]>;
    code: any;
    query: any;
    feed: any;
    contagem: any;
    encarregadoTeste: any;
    form: any;

    constructor(public af: AngularFire, private http: Http, private router: Router, private route: ActivatedRoute, private _fb: FormBuilder) {}

    ngOnInit() {

   

        this.af.auth.subscribe(res => {

            console.log(res);
            this.user = res;
            console.log(this.user.uid);
        });


        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

        });


    }


 


    add() {

    


    }

   


}