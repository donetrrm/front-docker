import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreateSaleModal } from "./modals/create-sale-modal/create-sale-modal";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "app/shared/api/api.service";
import { MatTableDataSource } from "@angular/material/table";
import { ShowProductsSaleModal } from "./modals/show-products-sale-modal/show-produtcs-sale-modal";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"],
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = [
    "totalSale",
    "paymentType",
    "products",
    "createAt",
  ];
  dayTotalSale: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sales: any = [];
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.sales = [];
    this.getSalesByBranch();
    this.dayTotalSale = 0;
  }

  createSale() {
    const dialogRef = this.dialog.open(CreateSaleModal);
    dialogRef.afterClosed().subscribe((result) => {
      this.getSalesByBranch();
    });
  }

  getSalesByBranch() {
    this.api.getSalesByBranch(this.api.getCurrentBranchID()).subscribe(
      (response) => {
        this.sales = new MatTableDataSource(response);
        this.sales.paginator = this.paginator;
        this.sales.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Ventas por página";
        console.log(response);
        this.dayTotalSale = 0;
        response.forEach(sale => {
          this.dayTotalSale+=sale.total;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showProducts(productsSale) {
    this.dialog.open(ShowProductsSaleModal, {
      data: productsSale,
    });
  }
}
