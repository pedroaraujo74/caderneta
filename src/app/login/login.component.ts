import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router'
import { Http } from "@angular/http"
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from "./login.interface"

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.css']
})


export class LoginComponent implements OnInit {
    body: any;
    err: any;
    email: any;
    password: any;
    isVisible: any = false;
    form: FormGroup;
    constructor(public af: AngularFire, private router: Router, private http: Http, private _fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this._fb.group({
            email: "",
            password: ""
        });

     
    }


    login(model: User, isValid: boolean) {

        console.log(model);


        this.af.auth.login(model).then(res => {

            this.af.auth.subscribe(res => {
                console.log(res);
                if (res.auth.displayName == "professor") {
                    this.router.navigate(['/home/turmas'])
                } else {
                    this.err = "Esta Conta não pertence a um professor";
                }
            })


        }).catch(err => {
            this.isVisible = true;
               setTimeout(() => {
            this.isVisible = false;
        }, 5000);

            this.err = err.message;
            if (err.message == "The email address is badly formatted.") {
                this.err = "Email mal formatado";
                this.isVisible = true;
            }
            if (err.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                this.err = "Não existe utilizador com este email";
                this.isVisible = true;
            }
            if (err.message == "The password is invalid or the user does not have a password.") {
                this.err = "Email e password não correspondem";
                this.isVisible = true;
            }
        })
    }

    loginGoogle() {

        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        }).then(res => {
            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + res.auth.uid + '.json')
                .subscribe(data => {
                    console.log(data.json);
                    if (data.json() == null) {
                        this.router.navigate(['/registo_social'])
                    } else {
                        this.router.navigate(['/home/turmas'])
                    }
                });
        })

    }

    loginFacebook() {

        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Redirect
        }).then(res => {
            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + res.auth.uid + '.json')
                .subscribe(data => {
                    console.log(data.json);
                    if (data.json() == null) {
                        this.router.navigate(['/registo_social'])
                    } else {
                        this.router.navigate(['/home/turmas'])
                    }

                });

        })
    }

    registar() {
        this.router.navigate(['/registo'])
    }
}