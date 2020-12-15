import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  userLogin: LoginUser;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errorMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();

    }
  }

  onLogin(): void{
    this.userLogin = new LoginUser(this.nombreUsuario, this.password);
    this.authService.login(this.userLogin).subscribe(
      resp => {
        this.isLogged = true;

        this.tokenService.setToken(resp.token);
        this.tokenService.setUserName(resp.nombreUsuario);
        this.tokenService.setAuthorities(resp.authorities);
        this.roles = resp.authorities;
        this.toastr.success('Bienvenido ' + resp.nombreUsuario, 'Ok', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      error => {
        this.isLogged = false;
        this.errorMsj = error.error.message;
        this.toastr.error(this.errorMsj, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'

        });
        //console.log(error.error.message);
      }
    );
  }

}
