import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Headers } from '@angular/http'
import { Router, ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs/Subject';

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
    texto: any;
    user: any;
    constructor(public af: AngularFire, private http: Http, private router: Router, private route: ActivatedRoute) {





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

        this.scrollToBottom();
    
        this.sub = this.route.params.subscribe(params => {

    this.id2 = params['id'] // (+) converts string 'id' to a number
});

this.chat = this.af.database.list('encarregados/' + this.id2 + '/chat');

let user = this.af.database.object('encarregados/' + this.id2);

user.subscribe(res => this.user = res);

    }

add() {

    this.body =

        {
            from: 0,
            mensagem: this.texto
        }

    this.http.post('https://caderneta-2b6e4.firebaseio.com/encarregados/' + this.id2 + '/chat.json', this.body)
        .map(res => res.json())
        .subscribe(
        data => { this.texto = "" },
        err =>
            () => console.log('complete')
        );


}




}
