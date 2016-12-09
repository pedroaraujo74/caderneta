import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({

    selector: 'encarregados',
    templateUrl: 'encarregados.component.html',
    styleUrls: ['encarregados.css']
})
export class EncarregadosComponent implements OnInit {
    disciplina: any;
    contagem: Number;
    sub: any;
    id: any;



    constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

        });
        this.disciplina = this.af.database.list('/encarregados', {
            query: {
                orderByChild: "codigo_disciplina",
                equalTo: this.id
            }
        });


    }
    avancar(id) {
        this.router.navigate(['home/turma/' + this.id + '/encarregados/', id]);

    }


}