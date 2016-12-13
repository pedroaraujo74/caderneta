import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from "rxjs/Rx";

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
    teste: any;
    result: any;

    encarregados: any;
    notificacoes: any;


    constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router, private http: Http) { }

    ngOnInit() {


        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

        });

        this.af.auth.subscribe(auth => {

            this.encarregados = this.af.database.list('/encarregados', {
                query: {
                    orderByChild: "codigo_disciplina",
                    equalTo: this.id
                }
            })
            

            /*
                let obs = this.disciplina.subscribe(res => {
            
                            for (var i in res) {
            
                                this.chat = this.af.database.list('professores/' + auth.uid + '/chat/' + res[i].$key, {
            
                                    query:{
                                        orderByKey:true,
                                        equalTo: "notificacao"
                                    }
                                })
                                    .subscribe(result => {
            
            
                                        console.log(res[i].$key + "   " + result[0].$value;
            
            
                                        for (var x = 0; x < res.length; x++) {
                                           
                                         res[x]["notificacao"] = result["0"].$value
                                            this.teste = res;
                                        }
                                        console.log(this.teste);
            
                                    });
            
            
            
                            }
            
                        });
             */
        });


    }





    avancar(id) {
        this.router.navigate(['home/turma/' + this.id + '/encarregados/', id]);

    }





}