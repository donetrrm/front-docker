import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  constructor(
    private api:ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ["", Validators.required],
      password: ['', Validators.required],
    })
  }

  login(loginForm:any){
    this.api.login(loginForm).subscribe(data => {
      if(data.access_token){
        localStorage.setItem('token',data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if(data.user.role.name === 'Administrador'){
          this.router.navigate(['dashboard']);
        }
        data.user.role.name === 'Administrador' ? this.router.navigate(['dashboard']) : this.router.navigate(['sales']);
      }
    });
  }

}
