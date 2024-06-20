import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productData: any = [];
  displayedColumns = ['image', 'brand', 'name', 'category', 'size', 'price']
  productForm: FormGroup
  submitted: boolean = false;
  bottomSheetRef: any;

  constructor(
    public apiService: ApiService,
    public bottomSheet: MatBottomSheet,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      size: ['', [Validators.required]],
      image: [''],
      price: ['', [Validators.required]],
    })

    this.getListOfProducts();
  }

  getListOfProducts() {
    var url = "getAllProducts";
    this.apiService.getMethod(url).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.productData = res
        } else {
          this.productData = []
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  createProduct() {
    this.bottomSheetRef = this.bottomSheet.open(this.BottomSheetOverviewExampleSheet);
  }

  submitProduct() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      var url = "createProduct";
      let reqBody = {
        brand: this.productForm.controls['brand'].value,
        name: this.productForm.controls['name'].value,
        category: this.productForm.controls['category'].value,
        size: this.productForm.controls['size'].value,
        image: this.productForm.controls['image'].value,
        price: this.productForm.controls['price'].value,
      }
      this.apiService.postMethod(url, reqBody).subscribe({
        next: (res: any) => {
          this.bottomSheetRef.dismiss();
          this.snackBar.open("Product created successfully..!", "Okay", {
            duration: 3000
          })
          this.getListOfProducts();
        }, error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  @ViewChild('BottomSheetOverviewExampleSheet', { static: true }) private BottomSheetOverviewExampleSheet: any;
}
