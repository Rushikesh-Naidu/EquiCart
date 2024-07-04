import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatCardModule,
    MatSnackBarModule
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
    public router: Router,
    public apiService: ApiService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]],
      passCode: ['', [Validators.required]]
    })
  }

  login() {
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    var url = "userValid/"+this.loginForm.controls['phoneNumber'].value;
    this.apiService.getMethod(url).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res && res.length>0){
          if(res[0].pin == this.loginForm.controls['passCode'].value){
            if(res[0].phone == "9999999999"){
              this.snackBar.open("Admin login successful..!","Okay",{
                duration: 3000
              })
              sessionStorage.setItem("isAdmin", "true");
              sessionStorage.setItem("name",res[0].name);
              sessionStorage.setItem("phone",res[0].phone);
              this.router.navigate(['/product'])
            } else {
              this.snackBar.open("User login successful..!","Okay",{
                duration: 3000
              })
              sessionStorage.setItem("isAdmin", "false");
              sessionStorage.setItem("name",res[0].name);
              sessionStorage.setItem("phone",res[0].phone);
              this.router.navigate(['/home'])
            }
          } else {
            this.snackBar.open("Enter valid credentials..!","Okay",{
              duration: 3000
            })  
          }
        } else {
          this.snackBar.open("Could not find phone number..!","Okay",{
            duration: 3000
          })
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  register() {
    this.router.navigate(['/register'])
  }
}