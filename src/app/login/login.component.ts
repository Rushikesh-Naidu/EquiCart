import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatStepperModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  showMainLoginScreen: boolean = false;
  loginForm: FormGroup;
  showLoginPanel: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public bottomSheet : MatBottomSheet
  ) { }

  @ViewChild('loginBottomSheet', {static: false}) private loginBottomSheet: ComponentType<unknown>;

  ngOnInit() {
    setTimeout(() => {
      this.showMainLoginScreen = true;
    }, 1200);
    setTimeout(() => {
      this.showLoginPanel = true
    }, 5000);
    this.loginForm = this.formBuilder.group({
      phone: ['']
    })
  }

  openLoginBottomSheet(){
    this.bottomSheet.open(this.loginBottomSheet)
  }
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
}
