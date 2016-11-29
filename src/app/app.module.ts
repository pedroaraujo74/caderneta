import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';



const myFirebaseConfig = {
  apiKey: 'AIzaSyDMuTuGTOL0hANsZ7ZS11rY9vZtYABUVbM',
  authDomain: 'caderneta-2b6e4.firebaseapp.com',
  databaseURL: 'https://caderneta-2b6e4.firebaseio.com/',
  storageBucket: 'gs://caderneta-2b6e4.appspot.com/',
}
const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
