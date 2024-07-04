import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeForm: FormGroup;
  filteredProducts: any;
  productList: any = [];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public apiSerice: ApiService
  ) { }


  ngOnInit() {
    this.homeForm = this.formBuilder.group({
      search: [''],
      searchList: ['']
    })

    this.getProductList();
  }

  getProductList() {
    var url = "getAllProducts";
    this.apiSerice.getMethod(url).subscribe({
      next: (res: any) => {
        for (let obj of res) {
          obj["quantity"] = 0;
        }
        this.productList = res;
        this.homeForm.controls['searchList'].setValue(res);
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  increaseCount(obj: any) {
    if (obj.quantity >= 0) {
      obj.quantity++;
      var url = "addToCart";
      let reqBody = obj
      this.apiSerice.postMethod(url, reqBody).subscribe({
        next: (res:any)=>{

        }, error: (err: any)=>{
          console.log(err);
        }
      })
    }
  }

  decreaseCount(obj: any) {
    if (obj.quantity > 0) {
      obj.quantity--;
    }
  }

  resetSearch(){
    console.log(this.homeForm.controls['searchList'].value);
    this.productList = this.homeForm.controls['searchList'].value;
  }

  search(searchText: any) {
    if (searchText == '') {
      this.productList = this.homeForm.controls['searchList'].value;
    } else {
      this.filteredProducts = this.productList.filter((element: any) => {
        element.name.toLowerCase().includes(searchText.toLowerCase());
      });
      this.productList = this.filteredProducts;
    }
    console.log(this.productList);
  }
}
