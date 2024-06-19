import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public bottomSheet: MatBottomSheet,
    public router: Router,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      confirmPin: ['', [Validators.required]]
    })
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  register() {
    this.submitted = true;
    var url = "register"
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
    
    let reqBody = this.registerForm.value;
    if (this.registerForm.valid) {
      this.apiService.postMethod(url, reqBody).subscribe({
        next: (res:any)=>{
          console.log(res);
          
        },error:(err:any)=>{
          console.log(err);
          
        }
      })
      // this.router.navigate(['/home'])
    }
  }
}
