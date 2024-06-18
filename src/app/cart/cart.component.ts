import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart',
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
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartList = [
    {
      brand: "Maggi",
      name: "Maggi 2 - Minute Instant Noodles",
      category: "KITCHEN_ITEMS",
      size: "140 g",
      price: 28,
      image: "",
      quantity: 5,
      added: false
    },
    {
      brand: "Dettol",
      name: "Dettol Original Germ Protection Bathing Soap Bar",
      category: "BATHROOM_PRODUCTS",
      size: "125 g",
      price: 30,
      image: "https://m.media-amazon.com/images/I/41GxR7m3U6L._AC_UF1000,1000_QL80_.jpg",
      quantity: 1,
      added: false
    },
    {
      brand: "Heirtage",
      name: "Heritage Toned Milk",
      category: "MILK_PRODUCTS",
      size: "500 ml",
      price: 25,
      image: "",
      quantity: 2,
      added: false
    },
    {
      brand: "Amul",
      name: "Amul Fresh Malai Paneer",
      category: "KITCHEN_ITEMS",
      size: "200 g",
      price: 100,
      image: "",
      quantity: 1,
      added: false
    },
  ]

  constructor(){

  }

  ngOnInit(){

  }

  increaseCount(obj : any){
    if(obj.quantity>=0){
      obj.quantity++;      
    }
  }

  decreaseCount(obj : any){
    if(obj.quantity>0){
      obj.quantity--;      
    }
  }
}
