import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ApiService } from "app/shared/api/api.service";
declare var $: any;

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "image",
    "name",
    "sku",
    "price",
    "cost",
    "stock",
    "category",
    "updateAt",
    "actions",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: any = [];
  categories: any = [];
  filteredCateogories: any = [];
  uris: any = [];
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log("ngOnInit");
    this.products = [];
    this.api.getCategories().subscribe(
      (response) => {
        console.log(response);
        this.categories = response;
        this.filteredCateogories = this.categories.slice();
      },
      (error) => {
        console.log(error);
      }
    );
    this.loadProducts();
  }
  details(id: string) {
    this.router.navigateByUrl("products/" + id);
  }

  deleteProduct(product) {
    this.api.deleteProduct(product.id).subscribe(
      (response) => {
        console.log(response);
        this.showNotification("Producto elimnado correctamente", "success");
        this.api.getProducts().subscribe((response) => {
          this.products = response.data;
          console.log(product);
          this.uris.push({
            path: product.image.replace(
              "http://latienditadelmamado.com:3100/",
              ""
            ),
          });
          let form = new FormData();
          form.append("uris", JSON.stringify(this.uris));
          console.log(JSON.stringify(this.uris));
        });
      },
      (error) => {
        console.log("error al eliminar el producto: " + error);
        this.showNotification("No se pudo eliminar el producto", "danger");
      }
    );
  }

  showNotification(message, type) {
    //const type = ['info','success','warning','danger'];
    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: type,
        timer: 4000,
        placement: {
          from: "top",
          align: "right",
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  categorySelect(categoryId) {
    if (categoryId) {
      this.api.getProducts({ categoryId: categoryId }).subscribe((response) => {
        this.products = response.data;
        this.products = new MatTableDataSource(response.data);
        this.products.paginator = this.paginator;
        this.products.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Productos por página";
      });
    } else {
      this.loadProducts();
    }
  }
  
  loadProducts() {
    this.api.getProducts().subscribe(
      (response) => {
        console.log(response);
        this.products = new MatTableDataSource(response.data);
        this.products.paginator = this.paginator;
        this.products.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Productos por página";
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
