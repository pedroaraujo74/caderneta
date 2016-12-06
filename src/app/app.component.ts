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


  constructor(af: AngularFire, private http: Http) {}


}











