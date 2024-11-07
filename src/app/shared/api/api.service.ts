import { Injectable } from '@angular/core';
declare var $: any;
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host = 'http://localhost:3000/salesSystem';
  //private host = 'http://146.190.147.217/salesSystem';
  private staticFiles = 'http://latienditadelmamado.com:3100/'
  private apiUrl = this.host + '/';
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(item): Observable<any> {
    return this.http
      .post(this.apiUrl + 'auth/login', item)
      .pipe(catchError(err => this.handleError(err)));
  }

  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    return true;
  }
  /**
   *
   * @returns Current user id
   */
  getCurrentID() {
    return JSON.parse(localStorage.getItem('user')).id;
  }

  /**
   * @returns Current branch_id
   */
  getCurrentBranchID(): string{
    return JSON.parse(localStorage.getItem('user')).branch.id
  }
  ////
  getCategories(): Observable<any> {
    return this.http
      .get(this.apiUrl + 'categories/', this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  
  getCategoryById(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'categories/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  saveCategory(item): Observable<any> {
    if(item.id!=''){
      const id = item.id;
      delete item.id;
      return this.http
      .put(this.apiUrl + 'categories/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'categories/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
    
  }

  deleteCategory(id){
    return this.http
    .delete(this.apiUrl + 'categories/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  //Products
  getProducts(params?:any): Observable<any> {
    return this.http
      .get(this.apiUrl + 'products/', this.getOptions(params))
      .pipe(catchError(err => this.handleError(err)));
  }
  
  getProductById(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'products/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }
  saveProduct(item): Observable<any> {
    if(item.id!=''){
      const id = item.id;
      delete item.id;
      item.productImages != '' ? '' : delete item.productImages;
      return this.http
      .put(this.apiUrl + 'products/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'products/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
  }
  deleteProduct(id){
    return this.http
    .delete(this.apiUrl + 'products/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  uploadFiles(body:any): Observable<any>{
    return this.http.post<any>(this.staticFiles+'upload',body)
    .pipe(catchError((err)=> this.handleError(err)));

  }

  deletFiles(body:any): Observable<any>{
    return this.http.post<any>(this.staticFiles+'deleteFiles',body)
    .pipe(catchError((err)=>this.handleError(err)));
  }

  //Branches
  getBranches(params?:any): Observable<any> {
    return this.http
    .get(this.apiUrl+ 'branches', this.getOptions(params))
    .pipe(catchError(err => this.handleError(err)));
  }

  deleteBranch(id){
    return this.http
    .delete(this.apiUrl + 'branches/'+id ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  getBranchById(id): Observable<any> {
    return this.http
      .get(this.apiUrl + 'branches/'+id, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
  }

  saveBranch(item): Observable<any> {
    if(item.id != ''){
      const id = item.id;
      delete item.id;
      return this.http
      .put(this.apiUrl + 'branches/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'branches/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
  }

  getProductBranch(id:string): Observable<any>{
    return this.http.get(this.apiUrl + 'branches/'+id+'/getProduct',this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  getProductsBranch(id:string, params?:any): Observable<any>{
    return this.http.get(this.apiUrl + 'branches/'+id+'/getProducts',this.getOptions(params))
    .pipe(catchError(err => this.handleError(err)));
  }



  addProductBranch(branchId,item): Observable<any> {
    return this.http
    .post(this.apiUrl+ 'branches/'+branchId+'/addProduct',item, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  deleteProductBranch(id): Observable<any>{
    return this.http
    .delete(this.apiUrl + 'branches/'+id+'/deleteProduct' ,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  updateProductBranch(id,item): Observable<any>{
    return this.http
    .put(this.apiUrl + 'branches/'+id+'/updateProduct',item,this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  //Users
  getUsers(params?:any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'users', this.getOptions(params))
    .pipe(catchError(err => this.handleError(err)));
  }

  getRoles(): Observable<any> {
    return this.http
    .get(this.apiUrl + 'roles',this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  saveUser(item): Observable<any> {
    if(item.id != ''){
      const id = item.id;
      delete item.id;
      return this.http
      .put(this.apiUrl + 'users/'+id,item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }else{
      delete item.id;
      return this.http
      .post(this.apiUrl + 'users/',item, this.getOptions())
      .pipe(catchError(err => this.handleError(err)));
    }
  }

  deleteUser(id): Observable<any> {
    return this.http
    .delete(this.apiUrl + 'users/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  getUserById(id): Observable<any> {
    return this.http
    .get(this.apiUrl + 'users/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  
  //SALES
  createSale(item: any){
    return this.http
    .post(this.apiUrl+ 'sales/',item, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  getSalesByBranch(id: any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'sales/branch/'+id, this.getOptions())
    .pipe(catchError(err => this.handleError(err)));
  }

  //REPORTS
  getSalesByDatesAndBranch(item: any): Observable<any>{
    return this.http
    .get(this.apiUrl + 'reports/getSalesByDatesAndBranch', this.getOptions(item))
    .pipe(catchError(err => this.handleError(err)));
  }
  

  getOptions(params? : any): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      params
    };
    return httpOptions;
  }

  // Control de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was:`);
      console.log(error.error);
      this.showNotification('top','right',3,error.error.message);
    }
    if (error.status === 403) {
      this.logout();
    }

    if(error.error.message == 'Invalid Credentials'){
      let message = '<b>Credenciales Invalidas</b> por favor intente otra vez.'
      this.showNotification('top','right',3,message);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  showNotification(from, align,color, message){
    const type = ['info','success','warning','danger'];

    //const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message
    },{
        type: type[color],
        timer: 2000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">error</i> ' +
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
