import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/api/api.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES_ADMIN: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/categories', title: 'Categorias',  icon:'list', class: '' },
    { path: '/products', title: 'Productos',  icon:'shopping_cart', class: '' },
    { path: '/branches', title: 'Sucursales',  icon:'store', class: '' },
    { path: '/employes', title: 'Empleados',  icon:'people', class: '' },
    { path: '/sales', title: 'Ventas',  icon:'storefront', class: '' },
    { path: '/reports', title: 'Reportes',  icon:'description', class: '' },
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
  { path: '/sales', title: 'Ventas',  icon:'storefront', class: '' }, 
  { path: '/reports', title: 'Reportes',  icon:'description', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role.name;
    role === 'Administrador' ? this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem) : this.menuItems = ROUTES_EMPLOYEE.filter(menuItem => menuItem);
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    this.api.logout();
  }
}
