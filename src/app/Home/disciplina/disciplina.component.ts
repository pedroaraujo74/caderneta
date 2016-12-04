import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'disciplina',
    templateUrl: 'disciplina.component.html',
    styleUrls: ['disciplina.css']
})


export class DisciplinaComponent implements OnInit {
    body: any;
    sub: any;
    id: any
    user: any;
    email: any;
    disciplina: FirebaseListObservable<any[]>;
    code: any;
    query: any;
    evento_corpo: any;
    feed: any;
    evento_body: any;
    contagem: any;
    encarregadoTeste: any;


    
    constructor(public af: AngularFire, private http: Http, private router: Router, private route: ActivatedRoute) {

        this.user = ""

        this.af.auth.subscribe(res => {

            console.log(res);
            this.user = res;
            console.log(this.user.uid);
        });


        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

        });


        this.disciplina = af.database.list('disciplinas/' + this.id + '/encarregados');

        this.disciplina.subscribe(res => {
            console.log(res);
            this.contagem = res.length;
        })


        this.feed = af.database.list('disciplinas/' + this.id + '/feed');

    }



    ngOnInit() {



    }


    avancar(id) {
        this.router.navigate(['home/disciplina', this.id, id]);

    }


    add() {

        this.encarregadoTeste = {
            nome: "Pedro Araújo",
            photoUrl: "https://scontent.flis4-1.fna.fbcdn.net/v/t1.0-9/11220863_905757172805944_8420142272234467572_n.jpg?oh=ba68b10324fefe4f42645c6e3f768740&oe=58C50524",
            filho: "Joaozinho",
            chat: [
                {
                    from: 0,
                    mensagem: "Bem-vindo"
                }

            ]
        }

        this.http.post('https://caderneta-2b6e4.firebaseio.com/disciplinas/' + this.id + '/encarregados.json', this.encarregadoTeste)
            .map(res => res.json())
            .subscribe(
            data => console.log("sucesso"),
            err =>
                () => console.log('complete')
            );



        const subject = new Subject();


    }

    addEvento() {
        console.log(this.evento_corpo);
        this.evento_body = {
            titulo: this.evento_corpo

        }

        this.http.post('https://caderneta-2b6e4.firebaseio.com/disciplinas/' + this.id + '/feed.json', this.evento_body)
            .map(res => res.json())
            .subscribe(
            data => this.evento_corpo = "",
            err =>
                () => console.log('complete')
            );
    }

    removeEvento(id) {
        console.log(id);

        this.http.delete('https://caderneta-2b6e4.firebaseio.com/disciplinas/' + this.id + '/feed/' + id + '.json')
            .map(res => res.json())
            .subscribe(
            data => console.log("sucesso"),
            err =>
                () => console.log('complete')
     

            )}  
    

}
