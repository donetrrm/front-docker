import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';
import { MatTableDataSource}  from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort';


export interface CategoryData {
  id: string;
  name: string;
  description: string;
  updateAt: Date;
}

declare var $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit  {
  categories: MatTableDataSource<CategoryData>;
  displayedColumns: string[] = ['name', 'description', 'updateAt', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe(response=>{
      this.categories=new MatTableDataSource(response);
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Categorias por página';
    }, error =>{
      console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }


  details(id){
    this.router.navigateByUrl('categories/'+id);
  }

  delete(category){
    this.api.deleteCategory(category.id).subscribe(response => {
      console.log(response);
      this.showNotification('Categoria elimnada correctamente', 'success');
      this.api.getCategories().subscribe(response => {
        this.categories = response;
      })
    }, error => {
      console.log('error al eliminar la categoria: ' + error);
      this.showNotification('No se pudo eliminar la categoria', 'danger');
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

}
