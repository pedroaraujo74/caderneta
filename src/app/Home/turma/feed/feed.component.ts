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
    feed: any;
    teacher: any;
    search: any;
    photo: any;
    searchMode : boolean = false;
    insertMode : boolean = false;
    options =
    ['português', "inglês"];
    constructor(private af: AngularFire, private route: ActivatedRoute, private _fb: FormBuilder, private http: Http) { }

    ngOnInit() {

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

        this.feed = this.af.database.list('turmas/' + this.id + '/feed');

        let teacher_obs = this.af.database.list('/professores', {
            query: {
                orderByKey: true,
                equalTo: 'CKiiePZGPNQMYjUbDAW6YqIeINh1'
            }
        });

        teacher_obs.subscribe(res => { this.teacher = res[0]; console.log(this.teacher) });

        this.af.auth.subscribe(res => { 
        
        this.photo = res.auth.photoURL;

        });
    
    }


    addEvent(model: Event, isValid: boolean) {
        console.log(model);


        this.http.post('https://caderneta-2b6e4.firebaseio.com/turmas/' + this.id + '/feed.json', model)
            .map(res => res.json())
            .subscribe(
            data => { console.log("sucesso") },
            err =>
                () => console.log('complete')
            );
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
