import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component'
import { RegistoSocialComponent } from './registo_social/registo_social.component'

import { MaterialModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './home/perfil/perfil.component';
import { TurmasComponent } from './home/turmas/turmas.component';
import { TurmaComponent } from './home/turma/turma.component';
import { ChatComponent } from './home/turma/encarregados/chat/chat.component'
import { FeedComponent } from './home/turma/feed/feed.component';
import { EncarregadosComponent } from './home/turma/encarregados/encarregados.component';
import { ProfessoresComponent } from './home/turma/professores/professores.component';

import { DatepickerModule } from 'angular2-material-datepicker';
import { Ng2SelectModule } from 'ng2-material-select';
import { HorarioComponent } from './home/turma/horario/horario.component';



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
    { path: 'registo_social', component: RegistoSocialComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'turmas', component: TurmasComponent
            },
            {
                path: 'perfil', component: PerfilComponent
            },
            {
                path: 'turma/:id', component: TurmaComponent, children: [
                    {
                        path: 'feed', component: FeedComponent
                    },
                    {
                        path: 'encarregados', component: EncarregadosComponent
                    },
                    {
                        path: 'encarregados/:id', component: ChatComponent
                    },
                    {
                        path: 'professores', component: ProfessoresComponent
                    },
                    {
                        path: 'horario', component: HorarioComponent
                    }
                ],
            }

        ]
    },
];

@NgModule({
    declarations: [
        LoginComponent,
        RegistoComponent,
        RegistoSocialComponent,
        AppComponent,
        HomeComponent,
        PerfilComponent,
        TurmasComponent,
        TurmaComponent,
        ChatComponent,
        FeedComponent,
        ProfessoresComponent,
        EncarregadosComponent,
        HorarioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DatepickerModule,
        Ng2SelectModule,
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
        [MaterialModule.forRoot()],
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}