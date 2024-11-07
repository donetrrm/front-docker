import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-create-product-branch',
  templateUrl: './create-product-branch.component.html',
  styleUrls: ['./create-product-branch.component.css']
})
export class CreateProductBranchComponent implements OnInit {
  productId = "";
  branchId = "";
  formProduct: FormGroup;
  categories: any = [];
  filteredCateogories: any = [];
  filteredProducts: any = [];
  products: any = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      product_id: [''],
      name: ['', Validators.required],
      category_id: ['', Validators.required],
      price: ['',Validators.required],
      sku: [{value: '', disabled: true}, Validators.required],
      stock: ['', Validators.required]
    })
    this.branchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getCategories().subscribe(response => {
      this.categories = response;
      this.filteredCateogories = this.categories.slice();
    }, error => {
      console.log(error);
    });
  }


  save() {
    try {
        Swal.fire({
          title: '¿Está seguro de agregar este producto?',
          text: '¡Ésta acción no puede deshacerse!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, guardar producto!',
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
            const productData = {
              product_id: this.formProduct.get('product_id').value.id,
              stock: this.formProduct.get('stock').value,
              price: this.formProduct.get('price').value
            }
            console.log(productData);
            this.api.addProductBranch(this.branchId,productData).subscribe(response => {
              console.log(response);
              Swal.close();
              Swal.fire({
                title: 'Movimiento correcto',
                text: "El producto ha sido agregado correctamente",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigateByUrl('branches/details/'+this.branchId);
                }
              })
            }, error => {
              Swal.fire(
                'Ocurrió un error al agregar el producto',
                error.error.message,
                'error'
              )
            })
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
  showNotification(message, type) {
    //const type = ['info','success','warning','danger'];
    $.notify({
      icon: "notifications",
      message: message
    }, {
      type: type,
      timer: 4000,
      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }


  categorySelect(categoryId){
    this.api.getProducts({categoryId: categoryId}).subscribe(response => {
      this.products = response.data;
      this.filteredProducts = this.products.slice();
    })
  }

  productSelect(product) {
    this.formProduct.get('name').setValue(product.name);
    this.formProduct.get('category_id').setValue(product.category.id);
    this.formProduct.get('sku').setValue(product.sku);
    this.formProduct.get('stock').setValue(product.stock);
    this.formProduct.get('price').setValue(product.price);
  }
  

}
