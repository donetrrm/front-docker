import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent implements OnInit {

  employeId = "";
  roles: any = [];
  branches: any = [];
  formUser: FormGroup;
  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: [''],
      roleId: ['', Validators.required],
      branchId: ['', Validators.required],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      username: ['', Validators.required],
      password: [''],
    })
    this.employeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.api.getBranches().subscribe(branches => {
      this.branches = branches;
    });
    if (this.employeId) {
      this.api.getUserById(this.employeId).subscribe(response => {
        this.formUser.get('id').setValue(response.id);
        this.formUser.get('name').setValue(response.name);
        this.formUser.get('surnames').setValue(response.surnames);
        this.formUser.get('username').setValue(response.username);
        this.formUser.get('password').setValue(response.password);
        this.formUser.get('roleId').setValue(response.role.id);
        if(response.branch){
          this.formUser.get('branchId').setValue(response.branch.id);
        }
      }, error => {
        console.error(error);
      })
    }
    
  }

  save(){
    try {
      Swal.fire({
        title: '¿Está seguro de agregar este usuario?',
        text: '¡Ésta acción no puede deshacerse!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar usuario!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'PROCESANDO',
            text: 'AGUARDA UN MOMENTO POR FAVOR.',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            }
          });
          this.api.saveUser(this.formUser.value).subscribe(response => {
            console.log(response);
            Swal.close();
            Swal.fire({
              title: 'Movimiento correcto',
              text: "El usuario ha sido agregado correctamente",
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/employes');
              }
            })
          }, error => {
            console.log(error);
            Swal.fire(
              'Ocurrió un error al agregar el usuario',
              'Por favor contacta al administrador',
              'error'
            )
            console.log(error);
          })
        }
      })
  } catch (error) {
    console.log(error);
  }
  }

}
