import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.css']
})
export class CreateBranchComponent implements OnInit {
  brancheId = "";
  formBranche: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formBranche = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.brancheId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.brancheId) {
      this.api.getBranchById(this.brancheId).subscribe(response => {
        this.formBranche.get('name').setValue(response.name);
        this.formBranche.get('description').setValue(response.description);
        this.formBranche.get('id').setValue(response.id);
      }, error => {
        console.error(error);
      })
    }
  }


  save() {
    Swal.fire({
      title: '¿Está seguro de guardar esta sucursal?',
      text: '¡Ésta acción no puede deshacerse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar sucursal!',
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
        })
        this.api.saveBranch(this.formBranche.value).subscribe(response => {
          console.log(response);
          Swal.close();
          Swal.fire({
            title: 'Movimiento correcto',
            text: "La sucursal ha sido guardada correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('branches');
            }
          })
        }, error => {
          Swal.fire(
            'Ocurrió un error al guardar la sucursal',
            'Por favor contacta al administrador',
            'error'
          )
          console.log(error);
        })
      }
    })
  }

}
