import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

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
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isOpened= true;
  isCollapsed = false;
  pathName: string;

  constructor(
    private router: Router,
  ){}

  ngOnInit(){
    this.pathName = this.router.url
    console.log(this.pathName);
  }

  toggleMenu() {
    if(this.isOpened){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  navigateTo(path : any){
    this.router.navigate([path])
    this.pathName = path;
  }
  
  logout(){
    this.router.navigate(['/login'])
  }

}
