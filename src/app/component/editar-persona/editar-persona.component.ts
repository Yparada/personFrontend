import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  personas: any;
  paises: any;
  estados: any;
  id: any;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.formPers();
    this.listPaises();
    this.listEstados();
    this.extractPersona();
  }

  extractPersona(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.personasService.detail(id).subscribe(
      resp => {
        this.personas = resp;
      },
      error => {
        this.toastr.error(error.error.message, 'Fail', {
          timeOut: 3000,
        });
        this.router.navigate(['/'])
      }
    );

  }

  formPers(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],

    });

  }

  listEstados(): void {
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

  listPaises(): void {
    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    )

  }

  updatePersona(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.personasService.updatePersona(id, this.personas).subscribe(
      resp => {
        this.toastr.success('Persona actualizada', 'Ok', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.return();
      },
      error => {
        this.toastr.error(error.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'

        });
        this.return();
      }
    );
  }

  return(): void {
    this.router.navigate(['/listaPersona'])
  }
}
