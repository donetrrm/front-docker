import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

export interface BranchData {
  id: string;
  name: string;
  description: string;
}

declare var $: any;

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branches: MatTableDataSource<BranchData>;
  displayedColumns: string[] = ['name', 'description', 'updateAt', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getBranches().subscribe(response => {
      this.branches = new MatTableDataSource(response);
      this.branches.paginator = this.paginator;
      this.branches.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Sucursales por página';
    }, error => {
      console.log(error);
    })
  }


  edit(id){
    this.router.navigateByUrl('branches/'+id);
  }

  details(id){
    this.router.navigateByUrl('branches/details/'+id);
  }

  delete(category){
    this.api.deleteBranch(category.id).subscribe(response => {
      console.log(response);
      this.showNotification('Sucursal elimnada correctamente', 'success');
      this.api.getCategories().subscribe(response => {
        this.branches = response;
      })
    }, error => {
      console.log('error al eliminar la sucursal: ' + error);
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
    this.branches.filter = filterValue.trim().toLowerCase();

    if (this.branches.paginator) {
      this.branches.paginator.firstPage();
    }
  }

}
