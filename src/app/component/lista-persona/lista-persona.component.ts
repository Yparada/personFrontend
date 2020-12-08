import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {
  personaForm: FormGroup;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public personasService: PersonasService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarPersonas();

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
      error => { console.error(error) }
    )
  }

  eliminar(persona){
    this.personasService.deletePersona(persona.id).subscribe(resp=> {
      this.toastr.success('Persona eliminada', 'Ok',{
        timeOut: 3000,
      });
      this.cargarPersonas();
    },
      error=> {
        this.toastr.error(error.error.message, 'Fail',{
          timeOut: 3000,

        });
      }
    )
  }

  editar(persona){

    this.router.navigate(['/crearPersona'])
    console.log(persona);
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre ,
      apellido: persona.apellido ,
      edad: persona.edad ,
      pais: persona.pais ,
      estado: persona.estado ,

    })

  }



}
