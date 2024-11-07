import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CategoriesComponent } from 'app/categories/categories.component';
import { CreateComponent } from 'app/categories/create/create.component';
import { CreateProductComponent } from 'app/products/create-product/create-product.component';
import { ProductsComponent } from 'app/products/products.component';
import { BranchesComponent } from 'app/branches/branches.component';
import { CreateBranchComponent } from 'app/branches/create-branch/create-branch.component';
import { DetailsBranchComponent } from 'app/branches/details-branch/details-branch.component';
import { CreateProductBranchComponent } from 'app/branches/create-product-branch/create-product-branch.component';
import { EmployesComponent } from 'app/employes/employes.component';
import { CreateEmployeComponent } from 'app/employes/create-employe/create-employe.component';
import { SalesComponent } from 'app/sales/sales.component';
import { ReportsComponent } from 'app/reports/reports.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CreateComponent },
    { path: 'categories-new', component: CreateComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'products/:id', component: CreateProductComponent },
    { path: 'products-new', component: CreateProductComponent },
    { path: 'branches', component: BranchesComponent},
    { path: 'branches-new', component: CreateBranchComponent},
    { path: 'branches/:id', component: CreateBranchComponent},
    { path: 'branches/details/:id', component: DetailsBranchComponent},
    { path: 'branches/details/:id/create-product', component: CreateProductBranchComponent},
    { path: 'branches/details/:id/product/:idProduct', component: CreateProductBranchComponent},
    { path: 'employes', component: EmployesComponent},
    { path: 'employes/:id', component: CreateEmployeComponent},
    { path: 'employes-new', component: CreateEmployeComponent},
    { path: 'sales', component: SalesComponent},
    { path: 'reports', component: ReportsComponent}
    
];
