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

    body: any;
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
            password: ""
        });
    }

    registar(model: User, isValid: boolean) {


        this.af.auth.createUser(model).then(res => {
            console.log(res);

            this.http.post('https://caderneta-2b6e4.firebaseio.com/professores.json', model)
                .map(res => res.json())
                .subscribe(
                data => console.log("sucesso"),
                err =>
                    () => console.log('complete')
                );
            this.router.navigate(['/login'])
        }

        ).catch(err => this.err = err)




    }

}