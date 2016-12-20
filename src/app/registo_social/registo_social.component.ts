import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'
import { Http } from "@angular/http"
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from "./registo_social.interface"
@Component({
    selector: 'registo_social',
    templateUrl: 'registo_social.component.html',
    styleUrls: ['registo_social.css']
})


export class RegistoSocialComponent implements OnInit {
    body_auth: any;
    body_bd: any;
    name: any;
    erro: any;
    email: any;
    form: FormGroup;
    err: any;
    pw_confirm: any;
    nome: any;
    isVisible: any;

    constructor(public af: AngularFire, private router: Router, private http: Http, private _fb: FormBuilder) { }

    ngOnInit() {

        this.af.auth.subscribe(res => {

            this.name = res.auth.displayName;
            this.email = res.auth.email;

        })
        this.form = this._fb.group({

            disciplina: [null, Validators.required],
            telemovel: [null, Validators.compose([Validators.required, Validators.minLength(9)])]
        });

    }

    registar(model: User, isValid: boolean) {

        this.af.auth.subscribe(res => {

            this.body_bd = {
                email: res.auth.email,
                name: this.name,
                telemovel: model.telemovel,
                disciplina: model.disciplina,
                photoUrl: res.auth.photoURL
            }

            this.http.put('https://caderneta-2b6e4.firebaseio.com/professores/' + res.uid + '/.json', this.body_bd)
                .map(res => res.json())
                .subscribe(
                data => {
                    let teste = this.af.auth.subscribe(res => {
                        console.log(res);
                       
                    })
                },

                err => console.log(err)
                );
            this.router.navigate(['/login'])
        }

        )




    }

}