import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/api/api.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  products:any=[];
  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(response=>{
      console.log(response)
      this.products=response;
    }, error =>{
      console.log(error);
    })
  }
  details(id){
    this.router.navigateByUrl('products/'+id);
  }
}
