import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { CategoriesComponent } from "app/categories/categories.component";
import { CreateComponent } from "app/categories/create/create.component";
import { CreateProductComponent } from "app/products/create-product/create-product.component";
import { ProductsComponent } from "app/products/products.component";
import { BannersComponent } from "app/banners/banners.component";
import { CreateBannerComponent } from "app/banners/create-banner/create-banner.component";
import { NgxDropzoneModule } from "ngx-dropzone";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TranslatePipe } from "app/shared/pipes/translate.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table' 
import { MatSortModule } from "@angular/material/sort";
import { BranchesComponent } from "app/branches/branches.component";
import { CreateBranchComponent } from "app/branches/create-branch/create-branch.component";
import { DetailsBranchComponent } from "app/branches/details-branch/details-branch.component";
import { CreateProductBranchComponent } from "app/branches/create-product-branch/create-product-branch.component";
import { EmployesComponent } from "app/employes/employes.component";
import { CreateEmployeComponent } from "app/employes/create-employe/create-employe.component";
import { ModalEditProductBranch } from "app/branches/modals/edit-products/modal-edit-product";
import { SalesComponent } from "app/sales/sales.component";
import { CreateSaleModal } from "app/sales/modals/create-sale-modal/create-sale-modal";
import { ShowProductsSaleModal } from "app/sales/modals/show-products-sale-modal/show-produtcs-sale-modal";
import { ReportsComponent } from "app/reports/reports.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectFilterModule
    

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CategoriesComponent,
    CreateComponent,
    ProductsComponent,
    CreateProductComponent,
    BannersComponent,
    CreateBannerComponent,
    TranslatePipe,
    BranchesComponent,
    CreateBranchComponent,
    DetailsBranchComponent,
    CreateProductBranchComponent,
    EmployesComponent,
    CreateEmployeComponent,
    ModalEditProductBranch,
    SalesComponent,
    CreateSaleModal,
    ShowProductsSaleModal,
    ReportsComponent
  ],
})
export class AdminLayoutModule {}
