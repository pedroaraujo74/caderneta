import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  id_turma: any;
  horario: any;
  quinta: any;
  inicio: any;
  segunda: any;
  terca: any;
  tabela: any;
  form: any;
  constructor(private af: AngularFire, private route: ActivatedRoute, private _fb: FormBuilder, private http: Http) { }

  ngOnInit() {

    let array = [[" ", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    ["09:00", " ", " ", " ", " ", ""],
    ["10:00", " ", " ", " ", " ", ""],
    ["11:00", " ", " ", " ", " ", " "],
    ["12:00", " ", " ", " ", " ", " "],
    ["13:00", " ", " ", " ", " ", " "],
    ["14:00", " ", " ", " ", " ", " "],
    ["15:00", " ", " ", " ", " ", " "],
    ["16:00", " ", " ", " ", " ", " "],
    ["17:00", " ", " ", " ", " ", " "],
    ["18:00", " ", " ", " ", " ", " "],
    ];

    this.form = this._fb.group({
      nome: "",
      dia: "",
      hora: "",
    });

    this.route.parent.params.subscribe(params => {
      this.id_turma = params['id']; // (+) converts string 'id' to a number
    });

    let segunda = [];
    let terca = [];
    let quarta = [];
    let quinta = [];
    let sexta = [];

    this.horario = this.af.database.list('turmas/' + this.id_turma + '/horario');

    this.horario.subscribe(res => {

      console.log(res);
      segunda = res[2];
      terca = res[4];
      quarta = res[0];
      quinta = res[1];
      sexta = res[3];
    });

    for (let i = 0; i < segunda.length; i++) {
      for (let x = 0; x < 9; x++) {
        if (segunda[i].inicio == "09:00") {
          array[1][1] = segunda[i].nome;
        }
        if (segunda[i].inicio == "1" + x + ":00") {
          array[x + 2][1] = segunda[i].nome;
        }
      }
    }

    for (let i = 0; i < terca.length; i++) {
      for (let x = 0; x < 9; x++) {
        if (terca[i].inicio == "09:00") {
          array[1][2] = terca[i].nome;
        }
        if (terca[i].inicio == "1" + x + ":00") {
          array[x + 2][2] = terca[i].nome;
        }
      }
    }
    for (let i = 0; i < quarta.length; i++) {
      for (let x = 0; x < 9; x++) {
        if (quarta[i].inicio == "09:00") {
          array[1][3] = quarta[i].nome;
        }
        if (quarta[i].inicio == "1" + x + ":00") {
          array[x + 2][3] = quarta[i].nome;
        }
      }
    }
    for (let i = 0; i < quinta.length; i++) {
      for (let x = 0; x < 9; x++) {
        if (quinta[i].inicio == "09:00") {
          array[1][4] = quarta[i].nome;
        }
        if (quinta[i].inicio == "1" + x + ":00") {
          array[x + 2][4] = quinta[i].nome;
        }
      }
    }
    for (let i = 0; i < sexta.length; i++) {
      for (let x = 0; x < 9; x++) {
        if (sexta[i].inicio == "09:00") {
          array[1][5] = sexta[i].nome;
        }
        if (sexta[i].inicio == "1" + x + ":00") {
          array[x + 2][5] = sexta[i].nome;
        }
      }
    }


    this.tabela = this.makeTableHTML(array);




  }

  inserir(value, valid) {
    console.log(value);
    this.http.get('https://caderneta-2b6e4.firebaseio.com/turmas/' + this.id_turma + '/horario/' + value.dia + '.json').subscribe(result => {

      let temp = result.json();

      let final =

        {
          nome: value.nome,
          inicio: value.hora
        }






      temp.push(final);

      console.log(temp);
      this.http.put('https://caderneta-2b6e4.firebaseio.com/turmas/' + this.id_turma + '/horario/' + value.dia + '.json', temp).subscribe(patch => this.ngOnInit());



    });


  }

  makeTableHTML(myArray) {
    let result = "<table border=1>";
    for (var i = 0; i < myArray.length; i++) {
      result += "<tr>";
      for (var j = 0; j < myArray[i].length; j++) {
        result += "<td>" + myArray[i][j] + "</td>";
      }
      result += "</tr>";
    }
    result += "</table>";

    return result;
  }


}
