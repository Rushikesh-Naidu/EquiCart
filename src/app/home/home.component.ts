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

  // productList = [
  //   {
  //     brand: "Dettol",
  //     name: "Dettol Original Germ Protection Bathing Soap Bar",
  //     category: "BATHROOM_PRODUCTS",
  //     size: "125 g",
  //     price: 30,
  //     image: "https://m.media-amazon.com/images/I/41GxR7m3U6L._AC_UF1000,1000_QL80_.jpg",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Heirtage",
  //     name: "Heritage Toned Milk",
  //     category: "MILK_PRODUCTS",
  //     size: "500 ml",
  //     price: 25,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Furtune",
  //     name: "Fortune Sunlite Refined Sunflower Oil",
  //     category: "KITCHEN_ITEMS",
  //     size: "1 l",
  //     price: 156,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Britannia",
  //     name: "Britannia Milk Bread",
  //     category: "KITCHEN_ITEMS",
  //     size: "400 g",
  //     price: 50,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Amul",
  //     name: "Amul Fresh Malai Paneer",
  //     category: "KITCHEN_ITEMS",
  //     size: "200 g",
  //     price: 100,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Parle",
  //     name: "Hide & Seek Chocolate Chip Cookies",
  //     category: "KITCHEN_ITEMS",
  //     size: "200 g",
  //     price: 45,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Aashirvaad",
  //     name: "Aashirvaad Multigrain Atta",
  //     category: "KITCHEN_ITEMS",
  //     size: "5 kg",
  //     price: 341,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "BRU",
  //     name: "BRU Instant Coffee",
  //     category: "KITCHEN_ITEMS",
  //     size: "50 g",
  //     price: 125,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Maggi",
  //     name: "Maggi 2 - Minute Instant Noodles",
  //     category: "KITCHEN_ITEMS",
  //     size: "140 g",
  //     price: 28,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Pepsi",
  //     name: "Pepsi Soft Drink",
  //     category: "KITCHEN_ITEMS",
  //     size: "750 ml",
  //     price: 40,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  //   {
  //     brand: "Classmate",
  //     name: "Classmate Single Line Spiral Notebook - (302 Pages)",
  //     category: "KITCHEN_ITEMS",
  //     size: "1 unit",
  //     price: 175,
  //     image: "",
  //     quantity: 0,
  //     added: false
  //   },
  // ]
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
