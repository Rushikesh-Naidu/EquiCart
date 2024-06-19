import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router';
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
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public bottomSheet: MatBottomSheet,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['',[Validators.required]],
      passCode: ['',[Validators.required]]
    })
  }

  login(){
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    if(this.loginForm.controls['phoneNumber'].value==='9999999999' && this.loginForm.controls['passCode'].value==='0000'){
      // this.router.navigate(['/home']);
      
    }
  }

  register(){
    this.router.navigate(['/register'])
  }
}