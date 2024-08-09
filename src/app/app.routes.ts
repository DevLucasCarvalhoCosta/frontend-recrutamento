import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrousuariosComponent } from './pages/registrousuarios/registrousuarios.component'
import { RegistrovagasComponent } from './pages/registrovagas/registrovagas.component'
import { ListarcandidaturasComponent } from './pages/listarcandidaturas/listarcandidaturas.component';


export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    { path: 'registrousuarios', component: RegistrousuariosComponent },
    { path: 'registrovagas', component: RegistrovagasComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'listarcandidaturas', component: ListarcandidaturasComponent }



];
