import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Headers } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'aluno',
    templateUrl: 'aluno.component.html',
    styleUrls: ['chat.css']
})


export class AlunoComponent implements OnInit {
    body: any;
    texto: any;
    sub: any;
    id: any
    id2: any;
    chat: FirebaseListObservable<any[]>;
    user: any;
    email: any;
    aluno_obs: FirebaseListObservable<any[]>;
    aluno: any;
    code: any;
    query: any;
    encarregadoTeste: any;
    constructor(public af: AngularFire, private http: Http, private router: Router, private route: ActivatedRoute) {




        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.id2 = params['id2'] // (+) converts string 'id' to a number
        });




    }



    ngOnInit() {


        this.aluno_obs = this.af.database.list('disciplinas/' + this.id + '/encarregados/' + this.id2);

        this.aluno_obs.subscribe(res => { this.aluno = res });

        this.chat = this.af.database.list('disciplinas/' + this.id + '/encarregados/' + this.id2 + '/chat');
        console.log(this.chat)

    }


    add() {


        this.body =

            {
                from: 0,
                mensagem: this.texto
            }




        this.http.post('https://caderneta-2b6e4.firebaseio.com/disciplinas/' + this.id + '/encarregados/' + this.id2 + '/chat.json', this.body)
            .map(res => res.json())
            .subscribe(
            data => console.log("sucesso"),
            err =>
                () => console.log('complete')
            );



    }



}
