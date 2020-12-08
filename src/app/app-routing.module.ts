import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearPersonaComponent } from './component/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './component/editar-persona/editar-persona.component';
import { ListaPersonaComponent } from './component/lista-persona/lista-persona.component';

const routes: Routes = [
  {path: '', component: ListaPersonaComponent},
  {path: 'crearPersona', component: CrearPersonaComponent},
  {path: 'editarPersona/:id', component: EditarPersonaComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
