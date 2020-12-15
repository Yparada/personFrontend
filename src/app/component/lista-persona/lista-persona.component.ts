import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from 'src/app/services/personas/personas.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {
  personaForm: FormGroup;
  personas: any;
  roles: string[];
  isAdmin = false;

  constructor(
    public fb: FormBuilder,
    public personasService: PersonasService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarPersonas();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });


    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],

    });;
  }

  cargarPersonas(): void {
    this.personasService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error.error.message) }
    )
  }

  eliminar(persona) {
    this.personasService.deletePersona(persona.id).subscribe(resp => {
      this.toastr.success('Persona eliminada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.cargarPersonas();
    },
      error => {
        this.toastr.error(error.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'

        });
      }
    )
  }

  editar(persona) {

    this.router.navigate(['/crearPersona'])
    console.log(persona);
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,

    })

  }



}
