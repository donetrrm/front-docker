import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShowProductsSaleModal } from 'app/sales/modals/show-products-sale-modal/show-produtcs-sale-modal';
import { ApiService } from 'app/shared/api/api.service';

declare var $: any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  formDatesFilter: FormGroup;
  displayedColumns: string[] = [
    "totalSale",
    "paymentType",
    "products",
    "createAt",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sales: any = [];
  branches: any = [];
  isAdmin: boolean = true;
  totalSales: number = 0;
  totalProfit: number = 0;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }
  

  ngOnInit(): void {
    this.sales = [];
    this.formDatesFilter = this.formBuilder.group({
      branchId: ['',Validators.required],
      start: [Date, Validators.required],
      end: [Date, Validators.required],
    })
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role.name;

    if(role != 'Administrador'){
      this.isAdmin = false;
      this.formDatesFilter.get("branchId").setValue(this.api.getCurrentBranchID());
    }else{
      this.api.getBranches().subscribe(branches => {
        this.branches = branches;
      });
    }
  }

  filter(){
    const start = new Date(this.formDatesFilter.get('start').value);
    const end = new Date(this.formDatesFilter.get('end').value);
    this.formDatesFilter.get('start').setValue(start.toISOString());
    this.formDatesFilter.get('end').setValue(end.toISOString());
    this.api.getSalesByDatesAndBranch(this.formDatesFilter.value).subscribe(response => {
      console.log(response);
      this.totalSales = 0;
      this.totalProfit = 0;
      response.forEach(sale => {
        this.totalSales+=sale.total;
        let saleProfit = 0;
        sale.products.forEach(product => {
          saleProfit += product.profit
        })
        this.totalProfit+=saleProfit;
      });
      this.sales = new MatTableDataSource(response);
      this.sales.paginator = this.paginator;
      this.sales.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = "Ventas por página";
      this.api.showNotification('top', 'right',1, 'Filtros aplicados');
    })
  }

  showProducts(productsSale) {
    this.dialog.open(ShowProductsSaleModal, {
      data: productsSale,
    });
  }
}