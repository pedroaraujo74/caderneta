import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component'

import { MaterialModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { DisciplinasComponent } from './home/disciplinas/disciplinas.component';
import { DisciplinaComponent } from './home/disciplina/disciplina.component';
import { AlunoComponent } from './home/aluno/aluno.component'

const myFirebaseConfig = {
    apiKey: 'AIzaSyDMuTuGTOL0hANsZ7ZS11rY9vZtYABUVbM',
    authDomain: 'caderneta-2b6e4.firebaseapp.com',
    databaseURL: 'https://caderneta-2b6e4.firebaseio.com/',
    storageBucket: 'gs://caderneta-2b6e4.appspot.com/',
}
const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
}


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registo', component: RegistoComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'disciplinas', component: DisciplinasComponent
            },
            {
                path: 'disciplina/:id', component: DisciplinaComponent
            },
            {
                path: 'disciplina/:id/:id2', component: AlunoComponent
            }
        ]
    },
];


@NgModule({
    declarations: [
        LoginComponent,
        RegistoComponent,
        AppComponent,
        HomeComponent,
        DisciplinasComponent,
        DisciplinaComponent,
        AlunoComponent


    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
        [MaterialModule.forRoot()],
        RouterModule.forRoot(appRoutes)

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
