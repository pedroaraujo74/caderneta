import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from "rxjs/Rx";
import 'rxjs/add/operator/mergeMap'
@Component({

    selector: 'encarregados',
    templateUrl: 'encarregados.component.html',
    styleUrls: ['encarregados.css']
})
export class EncarregadosComponent implements OnInit {
    disciplina: any;
    contagem: Number;
    sub: any;
    chat: any;
    id: any;
    _encarregados: any;
    teste: any;
    result: any;
    encarregados: any;
    notificacoes: any;

    isVisible: any = true;
    constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {

        setTimeout(() => {
            this.isVisible = false;
        }, 1500);

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            this.isVisible = true;
        });

        this.af.auth.subscribe(auth => {

            this.encarregados = this.af.database.list('/encarregados', {
                query: {
                    orderByChild: "codigo_disciplina",
                    equalTo: this.id
                }
            })



            let obs = this.encarregados.subscribe(res => {

                for (let i = 0; i < res.length; i++) {

                    this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + auth.uid + '/chat/' + res[i].$key + '/notificacao.json').subscribe(resultado => {


                        res[i]["notificacao"] = resultado.json();
                        console.log(res);
                        this.teste = res;



                    });


                }
                this._encarregados = res;


            });

        });

    }



    avancar(id) {
        this.router.navigate(['home/turma/' + this.id + '/encarregados/', id]);

    }







}