import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
@Component({
    selector: 'turmas',
    templateUrl: 'turmas.component.html'
})


export class TurmasComponent implements OnInit {


    body: any;
    user: any;
    erro: any;
    email: any;
    teacher: any;
    item = [];
    turmas: any;
    class_name1: any;
    list: any;
    class_name: any;
    mensagem: any;
    disciplinas: FirebaseListObservable<any[]>;
    constructor(public af: AngularFire, private http: Http, private router: Router) { }


    ngOnInit() {

        this.af.auth.subscribe(res => {


            this.user = res;


            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '.json').subscribe(data => {
                this.teacher = data.json();
                //if (this.teacher.codigo_turma) {
                //   this.router.navigateByUrl('/home/turma/' + this.teacher.codigo_turma + '/feed')

                //     } else {
                //  }
            });

            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '/codigo_turmas.json').subscribe(data => {
                this.turmas = data.json();

                for (let i = 0; i < this.turmas.length; i++) {
                    this.disciplinas = this.af.database.list('/turmas/', {
                        query: {
                            orderByKey: true,
                            equalTo: this.turmas[i],

                        }
                    })

                    this.disciplinas.subscribe(res => this.item[i] = res);

                }

            });




            /*this.disciplinas = this.af.database.list('/turmas/' + res.auth.uid, {
                query: {
                    orderByKey: true,
                    equalTo: ""
                }
            }); */

        });


    }



    goto(nome) {

        this.router.navigateByUrl('/home/turma/' + nome + '/feed');


    }

    add() {

        let body = {
            "horario": {
                "quarta": [{
                    "inicio": 1600,
                    "nome": " ",
                }],
                "quinta": [{
                    "inicio": 1600,
                    "nome": " "
                }],
                "segunda": [{
                    "inicio": 1500,
                    "nome": ""
                }],
                "sexta": [{
                    "inicio": 1500,
                    "nome": " "
                }],
                "terca": [{
                    "inicio": 1500,
                    "nome": " "
                }],
               
            },
            "nome": this.class_name
        }
    



this.http.post("https://caderneta-2b6e4.firebaseio.com/turmas.json", body).subscribe(
    data => {
        this.class_name = ""; console.log(data);

        this.mensagem = "Turma Inserida com sucesso, partilhe o seguinte código com os professores e encarregados de educação desta turma: " + data.json().name;

        console.log(data.json().name);
        this.ngOnInit();
        let temp = this.turmas;
        temp.push(data.json().name);
        this.http.put('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '/codigo_turmas.json', temp)
            .subscribe(
            data => {



            },
            err =>
                () => console.log('complete')

            )
    },
    err => console.log('sucesso')
)
    }

associar() {

    this.list = this.af.database.list("/turmas", {
        query: {
            orderByKey: true,
            equalTo: this.class_name1
        }
    });

    let obs = this.list.subscribe(res => {

        if (res[0] == undefined) {
            this.erro = "Não existe nenhuma turma com este código";
            console.log(this.erro);
        } else {

            let temp = this.turmas;
            temp.push(this.class_name1);

            this.http.put('https://caderneta-2b6e4.firebaseio.com/professores/' + this.user.uid + '/codigo_turmas.json', temp)
                .subscribe(
                data => { this.class_name1 = ""; this.ngOnInit(); },
                err =>
                    () => console.log('complete')

                )
        }
    });
}
}

