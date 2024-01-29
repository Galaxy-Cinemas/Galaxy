import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@app/shared/interfaces/login.interface';
import { responseAuth } from '@app/shared/interfaces/response-auth.interface';
import { DataServiceService } from '@app/shared/services/data-service.service';
import { environment } from '@environment/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  
  formLogin: FormGroup;
  subRef$! : Subscription;
 
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataServiceService,) 
    {
      this.formLogin = formBuilder.group({
        email:['', Validators.required],
        password: ['', Validators.required]
      });
      
    }
  ngOnDestroy(): void {
    if(this.subRef$){
      this.subRef$.unsubscribe();
    }
  }

  ngOnInit() {
  }
  Login(){
    const usuarioLogin:  Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };


const url2= 'https://apim-galaxi.azure-api.net/Identity/v1/identity/authentication';

    const url = environment.api + 'v1/identity/authentication';
    this.subRef$ =  this.http.post<responseAuth>(url, usuarioLogin, {observe: 'response'})
             .subscribe(res => {
              const token = res.body?.response;
              // console.log('token', token);
              sessionStorage.setItem('token', token!);
              this.router.navigate(['/'])
             });

    // const url = 'http://localhost:41191/' + 'v1/identity/authentication';
    // this.subRef$ = this.dataService.post<responseAuth>(url,
    //   usuarioLogin)
    //   .subscribe(res => {
    //     const token = res.body?.response;
    //     console.log('token', token);
    //     this.securityService.SetAuthData(token);
    //     this.router.navigate(['/home']);
    //   }, err => {
    //     console.log('Error en el login', err);
    //   });

  }

}
