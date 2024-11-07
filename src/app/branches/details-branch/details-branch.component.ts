import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import { ModalEditProductBranch } from '../modals/edit-products/modal-edit-product';


declare var $: any;

@Component({
  selector: 'app-details-branch',
  templateUrl: './details-branch.component.html',
  styleUrls: ['./details-branch.component.css']
})

export class DetailsBranchComponent implements OnInit {
  categories: any = [];
  filteredCateogories: any = [];
  branchId = "";
  displayedColumns: string[] = ['image', 'name', 'sku', 'price', 'stock', 'category' ,'updateAt', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  products: any = [];
  uris: any = [];
  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.products = [];
    this.branchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProducts();
    this.api.getCategories().subscribe(
      (response) => {
        this.categories = response;
        this.filteredCateogories = this.categories.slice();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  details(product: any) {
    const dialogRef = this.dialog.open(ModalEditProductBranch, {
      data: product,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  createProduct(){
    this.router.navigateByUrl('/branches/details/'+this.branchId+'/create-product');
  }

  deleteProduct(productBranch){
    this.api.deleteProductBranch(productBranch.id).subscribe(response => {
      this.showNotification('Producto elimnado de sucursal correctamente', 'success');
      this.api.getBranchById(this.branchId).subscribe(response => {
        this.products = response.productsBranch;
      })
    }, error => {
      this.showNotification('No se pudo eliminar la sucursal', 'danger');
    });
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  categorySelect(categoryId) {
    if (categoryId) {
      this.api.getProductsBranch(this.branchId,{ categoryId: categoryId }).subscribe((response) => {
        this.products = new MatTableDataSource(response);
        this.products.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'name': return item.product.name;
          case 'sku': return item.product.sku;
          case 'category': return item.product.category.name;
          case 'updateAt': return item.updated_at
          default: return item[property];
        }
      };
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Productos por página'
      this.products.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1; 
      }
      });
    } else {
      this.getProducts();
    }
  }

  getProducts(){
    this.api.getBranchById(this.branchId).subscribe(response => {
      this.products = new MatTableDataSource(response.productsBranch);
      this.products.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'name': return item.product.name;
          case 'sku': return item.product.sku;
          case 'category': return item.product.category.name;
          case 'updateAt': return item.updated_at
          default: return item[property];
        }
      };
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Productos por página'
      this.products.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1; 
      }
    }, error => {
      console.error(error);
    })
  }

  

}
