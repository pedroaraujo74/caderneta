import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
    sub: any;
    id2: any;
    chat: any;
    body: any;
    encarregado: any;
    professor: any;
    texto: any;
    user: any;
    form: any;
    constructor(public af: AngularFire, private http: Http, private router: Router, private route: ActivatedRoute, public _fb: FormBuilder) {
    }

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    ngAfterViewChecked() {
        this.scrollToBottom();

    }




    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }



    ngOnInit() {

      
        this.form = this._fb.group({
            texto: ["", Validators.compose([Validators.required, Validators.minLength(1)])]
        });


        this.scrollToBottom();

        this.sub = this.route.params.subscribe(params => {

            this.id2 = params['id'] // (+) converts string 'id' to a number
        });

        this.af.auth.subscribe(res => {

            let notificacao = {
                notificacao_prof: false
            }

            this.http.patch('https://caderneta-2b6e4.firebaseio.com/professores/' + res.uid + '/chat/' + this.id2 + '.json', notificacao).subscribe(result => console.log(result));

            this.chat = this.af.database.list('professores/' + res.uid + '/chat/' + this.id2);


            let encarregado = this.af.database.object('encarregados/' + this.id2);

            encarregado.subscribe(res => this.encarregado = res);


        });
    }

    addZero(i) {


        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    enviar(model) {

        var d = new Date();
        var h = this.addZero(d.getHours());
        var m = this.addZero(d.getMinutes());



        let hora = h + ":" + m;

        this.body = {
            from: 0,
            mensagem: model.texto,
            data: hora
        }

        console.log(this.body)

        this.af.auth.subscribe(res => {
            this.http.post('https://caderneta-2b6e4.firebaseio.com/professores/' + res.uid + '/chat/' + this.id2 + '.json', this.body)
                .map(res => res.json())
                .subscribe(
                data => {
                    this.texto = ""

                    let notificacao = {
                        notificacao_enc: true
                    }

                    this.http.patch('https://caderneta-2b6e4.firebaseio.com/professores/' + res.uid + '/chat/' + this.id2 + '.json', notificacao).subscribe(result => console.log(result));
                },
                err =>
                    () => console.log('complete')
                );
        });
    }
}
