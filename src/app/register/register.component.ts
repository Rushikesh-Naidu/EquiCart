import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

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
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm : FormGroup;
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public bottomSheet: MatBottomSheet,
    public router: Router
  ){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      email: ['',[Validators.required]],
      pin: ['',[Validators.required]],
      confirmPin: ['',[Validators.required]]
    })
  }
  
  signIn(){
    this.router.navigate(['/login']);
  }

  register(){
    this.submitted = true;
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){
      this.router.navigate(['/home'])
    }
  }
}
