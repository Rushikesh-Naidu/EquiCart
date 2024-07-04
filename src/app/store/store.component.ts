import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-store',
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
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  storeData: any = [];
  displayedColumns = ['image', 'name',]
  storeForm: FormGroup
  submitted: boolean = false;
  bottomSheetRef: any;

  constructor(
    public apiService: ApiService,
    public bottomSheet: MatBottomSheet,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      logo: [''],
    })

    this.getListOfStores();
  }

  getListOfStores() {
    var url = "getAllStores";
    this.apiService.getMethod(url).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.storeData = res
        } else {
          this.storeData = []
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  createStore() {
    this.bottomSheetRef = this.bottomSheet.open(this.BottomSheetOverviewExampleSheet);
  }

  submitStore() {
    this.storeForm.markAllAsTouched();
    if (this.storeForm.valid) {
      var url = "createStore";
      let reqBody = {
        name: this.storeForm.controls['name'].value,
        logo: this.storeForm.controls['logo'].value
      }
      console.log(reqBody);
      this.apiService.postMethod(url, reqBody).subscribe({
        next: (res: any) => {
          this.bottomSheetRef.dismiss();
          this.snackBar.open("Store created successfully..!", "Okay", {
            duration: 3000
          })
          this.getListOfStores();
        }, error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  @ViewChild('BottomSheetOverviewExampleSheet', { static: true }) private BottomSheetOverviewExampleSheet: any;
}
