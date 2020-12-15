import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUser: NewUser;
  nombre: string;
  email: string;
  nombreUsuario: string;
  password: string;
  errorMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;

    }
  }

  onRegister(): void{
    this.newUser = new NewUser(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.new(this.newUser).subscribe(
      resp => {
      this.toastr.success('Cuenta creada', 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

        this.router.navigate(['/login']);
      },
      error => {
        this.errorMsj = error.error.mensaje;
        this.toastr.error(this.errorMsj, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'

        });
      }
    );
  }

}
