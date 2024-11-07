import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "app/shared/api/api.service";

@Component({
    selector: 'modal-edit-product-branch',
    templateUrl: './modal-edit-products.html',
  })
  export class ModalEditProductBranch {
    stock:string = "";
    price :number;
    productBranchId: string = "";
    constructor(
      public dialogRef: MatDialogRef<ModalEditProductBranch>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private api: ApiService
    ) {}
  
    ngOnInit(){
      this.stock = this.data.stock;
      this.price = this.data.price;
      this.productBranchId = this.data.id;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    updateProduct(): void {
      const dataToUpdate = {
        stock: this.stock,
        price: this.price
      }
      this.api.updateProductBranch(this.productBranchId,dataToUpdate).subscribe(response =>{
        this.dialogRef.close();
      })
    }
  }