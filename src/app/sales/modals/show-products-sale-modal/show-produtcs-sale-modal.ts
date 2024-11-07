import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";

@Component({
    selector: "show-products-sale-modal",
    templateUrl: "./show-products-sale-modal.html",
    styleUrls: ["show-products-sale-modal.css"]
})
export class ShowProductsSaleModal {
    displayedColumns: string[] = ["image","name", "quantity", "price", "total"];
    @ViewChild(MatTable) table: MatTable<any>;

    showProfitColumn: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<ShowProductsSaleModal>,
        @Inject(MAT_DIALOG_DATA) public productsSaleDetails: any,
    ) {}

    ngOnInit(): void {
        console.log(this.productsSaleDetails);
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role.name;
        if(role === 'Administrador'){
            this.showProfitColumn = true;
            this.displayedColumns.push("profit");
        }
        
    }
}