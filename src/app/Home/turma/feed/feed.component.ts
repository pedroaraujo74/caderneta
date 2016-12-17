import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'feed',
    templateUrl: 'feed.component.html',
    styleUrls: ['feed.css']
})
export class FeedComponent implements OnInit {
    sub: any;
    form: any;
    date: any;
    id: string;
    body: any;
    filtro: any;
    feed: any;
    teacher: any;
    search: any;
    photo: any;
    searchMode: boolean = false;
    insertMode: boolean = false;

    constructor(private af: AngularFire, private route: ActivatedRoute, private _fb: FormBuilder, private http: Http) { }

    ngOnInit() {

        this.filtro = 0;

        this.search = 0;
        this.form = this._fb.group({
            title: "",
            desc: "",
            eventDate: this.date,
            dateCreation: Date.now(),
            type: 0,
            disciplina: "",
        });
        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
        });

        this.feed = this.af.database.list('turmas/' + this.id + '/feed', {
            query: {
                orderByChild: "eventDate"

            }
        });

        this.af.auth.subscribe(res => {

            this.photo = res.auth.photoURL;

        });

    }


    addEvent(model, isValid: boolean) {


        this.af.auth.subscribe(res => {

            this.http.get('https://caderneta-2b6e4.firebaseio.com/professores/' + res.uid + '.json')
                .map(res => res).subscribe(data => {
                    this.teacher = data.json();

                    this.body = {
                        title: model.title,
                        desc: model.desc,
                        eventDate: this.date,
                        dateCreation: Date.now(),
                        type: model.type,
                        disciplina: this.teacher.disciplina,
                        createdBy: this.teacher.name,
                        photoUrl: this.teacher.photoUrl
                    }

                    this.http.post('https://caderneta-2b6e4.firebaseio.com/turmas/' + this.id + '/feed.json', this.body)
                        .subscribe(
                        data => { console.log("sucesso") },
                        err =>
                            () => console.log('complete')
                        );

                });
        });
    }

    removeEvento(id) {
        console.log(id);

        this.http.delete('https://caderneta-2b6e4.firebaseio.com/turmas/' + this.id + '/feed/' + id + '.json')
            .map(res => res.json())
            .subscribe(
            data => console.log("sucesso"),
            err =>
                () => console.log('complete')


            )
    }
}
