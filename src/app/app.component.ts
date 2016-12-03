import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  body: any;
  code: any;
  codigos: any;


  constructor(af: AngularFire, private http: Http) {

    /*
       
    */

  }



  gerar() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  }

  addTurma() {

    this.code = "2k21g"
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');


    this.body =
      {
        "encarregados": [
          {
            "id_encarregado": 2
          }
        ],
        "id_prof": "id_atual"

      }

    this.http.put('https://caderneta-2b6e4.firebaseio.com/codigos/' + this.gerar() + '.json/', this.body, {
      headers: headers
    })
      .map(res => res.json())
      .subscribe(
      data => console.log("sucesso"),
      err =>
        () => console.log('complete')
      );


  }

}











