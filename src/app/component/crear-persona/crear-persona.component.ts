import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {
  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;


  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personasService: PersonasService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formPers();
    this.listPaises();
    this.listEstados();

  }

  formPers(): void{
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],

    });

  }

  listEstados(): void{
    this.personaForm.get('pais').valueChanges.subscribe(value => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => {
          console.error(error)
        }
      )

    })

  }

  listPaises(): void{
    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    )

  }

  guardar(): void {
    this.personasService.savePersona(this.personaForm.value).subscribe(
      resp => {
      this.personaForm.reset();
      this.toastr.success('Persona agregada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.return();
    },
      error => {
        this.toastr.error(error.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'

        });
      }
    )

  }

  return(): void {
    this.router.navigate(['/listaPersona'])
  }

}
