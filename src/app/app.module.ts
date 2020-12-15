import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import { ToastrModule } from 'ngx-toastr';
import { ListaPersonaComponent } from './component/lista-persona/lista-persona.component';
import { CrearPersonaComponent } from './component/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './component/editar-persona/editar-persona.component';
import { DetallePersonaComponent } from './component/detalle-persona/detalle-persona.component';
import { LoginComponent } from './component/auth/login/login.component';
import { NewUserComponent } from './component/auth/new-user/new-user.component';
import { MenuComponent } from './component/menu/menu.component';
import { IndexComponent } from './component/index/index.component';
import { interceptorProvider } from './services/interceptors/personas-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    ListaPersonaComponent,
    CrearPersonaComponent,
    EditarPersonaComponent,
    DetallePersonaComponent,
    LoginComponent,
    NewUserComponent,
    MenuComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
