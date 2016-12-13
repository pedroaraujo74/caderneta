import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'
import { Http } from "@angular/http"
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from "./registo.interface"
@Component({
    selector: 'registo',
    templateUrl: 'registo.component.html',
    styleUrls: ['registo.css']
})


export class RegistoComponent implements OnInit {
    body_auth: any;
    body_bd: any;
    erro: any;
    email: any;
    password: any;
    form: FormGroup;
    err: any;

    constructor(public af: AngularFire, private router: Router, private http: Http, private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            name: "",
            email: "",
            password: "",
            disciplina: "",
        });



    }

    registar(model: User, isValid: boolean) {



        this.body_auth= {
            email: model.email,
             password: model.password,

        }

        this.body_bd = {
             email: model.email,
             name : model.name,
             disciplina : model.disciplina,
        }

        

        this.af.auth.createUser(this.body_auth).then(res => {
            console.log(res);


            this.http.put('https://caderneta-2b6e4.firebaseio.com/professores/' + this.af.auth.getAuth().uid + '/.json', this.body_bd)
                .map(res => res.json())
                .subscribe(
                data => {
                    let teste = this.af.auth.subscribe(res => {
                        console.log(res); 

                        res.auth.updateProfile({
                            displayName: "professor",
                            photoURL: ""
                        })
                    })
                },

                err => console.log(err)
                );
            this.router.navigate(['/login'])
        }

        ).catch(err => this.err = err)




    }

}