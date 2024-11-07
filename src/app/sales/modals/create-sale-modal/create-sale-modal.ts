import { Component, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { ApiService } from "app/shared/api/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "create-sale-modal",
  templateUrl: "./create-sale-modal.html",
  styleUrls: ["./create-sale-modal.css"],
})
export class CreateSaleModal {
  categories: any = [];
  filteredCateogories: any = [];
  products: any = [];
  filteredProducts: any = [];
  price: number = 0.0;
  productBranch: any;
  formAddProductSale: FormGroup;
  productsSale = [];
  displayedColumns: string[] = ["name", "quantity", "price", "total", "action"];
  totalSale: number = 0.0;
  formCreateSale: FormGroup;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    public dialogRef: MatDialogRef<CreateSaleModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formAddProductSale = this.formBuilder.group({
      category_select: ["", Validators.required],
      product_select: ["", Validators.required],
      quantity: ["", Validators.required],
    });

    this.formCreateSale = this.formBuilder.group({
      productsString: [""],
      paymentType: ["", Validators.required],
      userId: ["", Validators.required],
      branchId: ["", Validators.required],
    });
    this.formAddProductSale.get("product_select").disable();
    this.api.getCategories().subscribe(
      (response) => {
        this.categories = response;
        this.filteredCateogories = this.categories.slice();
      },
      (error) => {
        console.log(error);
      }
    );
    this.formCreateSale.get("userId").setValue(this.api.getCurrentID());
    this.formCreateSale.get("branchId").setValue(this.api.getCurrentBranchID());
  }

  categorySelect(categoryId) {
    this.api
      .getProductsBranch(this.api.getCurrentBranchID(), {
        categoryId: categoryId,
        stock: 0
      })
      .subscribe((response) => {
        this.products = response;
        this.setDisplayName();
        this.formAddProductSale.get("product_select").enable();
      });
    this.price = 0.0;
  }

  productSelect(productBranch) {
    this.price = productBranch.price;
    this.productBranch = productBranch;
  }

  addProduct() {
    const quantity = this.formAddProductSale.get("quantity").value;
    const product = {
      name: this.productBranch.product.name,
      quantity: quantity,
      price: this.price,
      total: this.price * quantity,
      product: this.productBranch.product.id,
    };
    this.productsSale.push(product);
    this.totalSale += product.total;
    this.formAddProductSale.get("quantity").setValue(0);
    this.formAddProductSale.reset();
    this.formAddProductSale.get("product_select").disable();
    this.price = 0.0;
    this.table.renderRows();
  }

  deleteProduct(product) {
    this.totalSale -= product.total;
    this.productsSale.splice(this.productsSale.indexOf(product), 1);
    this.table.renderRows();
    if (this.productsSale.length <= 0) {
      this.formCreateSale.get("paymentType").reset();
    }
  }

  createSale() {
    this.formCreateSale
      .get("productsString")
      .setValue(JSON.stringify(this.productsSale));
    Swal.fire({
      title: "¿Está seguro de crear esta venta?",
      text: "¡Ésta acción no puede deshacerse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, crear venta!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "PROCESANDO",
          text: "AGUARDA UN MOMENTO POR FAVOR.",
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        this.api.createSale(this.formCreateSale.value).subscribe(
          (response) => {
            Swal.close();
            Swal.fire({
              title: "Movimiento correcto",
              text: "La venta ha sido creada correctamente",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close();
              }
            });
          },
          (error) => {
            console.log(error);
            Swal.fire(
              "Ocurrió un error al crear la venta",
              "Por favor contacta al administrador",
              "error"
            );
            console.log(error);
          }
        );
      }
    });
  }

  setDisplayName(){
    this.products.forEach(productBranch => {
      productBranch.displayName = productBranch.product.name;
    });
    this.filteredProducts = this.products.slice();
  }
}
