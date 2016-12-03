import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'disciplina',
    templateUrl: 'disciplina.component.html'
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
    feed: any;
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

        this.disciplina.subscribe(res => console.log(res))

        this.feed = af.database.list('disciplinas/' + this.id + '/feed');


    }



    ngOnInit() {



    }

    avancar(id) {
        this.router.navigate(['home/disciplina', this.id, id]);

    }


    add() {

        this.encarregadoTeste = {
            nome: "pedro",

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



}
