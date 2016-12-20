import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'professores',
    templateUrl: 'professores.component.html',
    styleUrls: ['professores.css']
})
export class ProfessoresComponent implements OnInit {

    professores: any;
    sub: any;
    id: any;
    _professores: any;
    constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router) { }
    ngOnInit() {

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
        });


        this.af.auth.subscribe(res => {
            this.professores = this.af.database.list('/professores', {

            });

            /*    let teste = this.af.database.list(this.professores,{
                    query: {
                        orderByChild: "$key",
                        equalTo: this.id
                    }
                });
                */



        });

    }

}