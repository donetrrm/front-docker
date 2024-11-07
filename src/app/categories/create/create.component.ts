import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import Swal from 'sweetalert2'
declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  categoryId = "";
  formCategory: FormGroup;
  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.api.getCategoryById(this.categoryId).subscribe(response => {
        this.formCategory.get('name').setValue(response.name);
        this.formCategory.get('description').setValue(response.description);
        this.formCategory.get('id').setValue(response.id);
      }, error => {
        console.error(error);
      })
    }
  }

  save() {
    Swal.fire({
      title: '¿Está seguro de guardar esta categoria?',
      text: '¡Ésta acción no puede deshacerse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar categoria!',
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
        this.api.saveCategory(this.formCategory.value).subscribe(response => {
          console.log(response);
          Swal.close();
          Swal.fire({
            title: 'Movimiento correcto',
            text: "La categoria ha sido guardada correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('categories');
            }
          })
        }, error => {
          Swal.fire(
            'Ocurrió un error al guardar la categoria',
            'Por favor contacta al administrador',
            'error'
          )
          console.log(error);
        })
      }
    })
  }
}
