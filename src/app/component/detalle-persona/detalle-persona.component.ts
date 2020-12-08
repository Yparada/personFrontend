import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { PaisesService } from 'src/app/services/paises/paises.service';
import { PersonasService } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-detalle-persona',
  templateUrl: './detalle-persona.component.html',
  styleUrls: ['./detalle-persona.component.css']
})
export class DetallePersonaComponent implements OnInit {
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
    this.extractpersona();
  }

  extractpersona(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.personasService.detail(id).subscribe(
      resp=> {
        this.personas = resp;
      },
      error=> {
        this.toastr.error(error.error.message, 'Fail', {
          timeOut: 3000,
        });
        this.return();
      }
    )
  }

  return(): void{
    this.router.navigate(['/'])

  }

}
