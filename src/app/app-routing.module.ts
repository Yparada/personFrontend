import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { NewUserComponent } from './component/auth/new-user/new-user.component';
import { CrearPersonaComponent } from './component/crear-persona/crear-persona.component';
import { DetallePersonaComponent } from './component/detalle-persona/detalle-persona.component';
import { EditarPersonaComponent } from './component/editar-persona/editar-persona.component';
import { IndexComponent } from './component/index/index.component';
import { ListaPersonaComponent } from './component/lista-persona/lista-persona.component';
import { PersonasGuardService as guard } from './services/guards/personas-guard.service';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: NewUserComponent },
  { path: 'listaPersona', component: ListaPersonaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'crearPersona', component: CrearPersonaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'editarPersona/:id', component: EditarPersonaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'detallePersona/:id', component: DetallePersonaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
