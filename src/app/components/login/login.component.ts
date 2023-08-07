import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService, NAME_LOCALSTORAGE } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  blockSpace: RegExp = /[^s]/; 
  formLogin: any;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private loadingService : LoadingService) {
    this.construirFormulario();
  }

  construirFormulario() {
    this.formLogin = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  openDashboard(pageName: string) {
    this.loginService.authenticate(this.formLogin.controls.username.value, this.formLogin.controls.password.value).subscribe({
      next: (data: any) => {
        if (data.token) {
          this.loadingService.setLoading(false);
          localStorage.setItem(NAME_LOCALSTORAGE, data.token);
          this.router.navigate([`${pageName}`]);
        }
      },
      error: (error: any) => {
        //Swal.fire('Oops!', error, 'warning');
      }
  });
    
  }
  isLoading(){
    return this.loadingService.getLoading();
  }

}
