import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    MatBadgeModule
  ],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isOpened = true;
  isCollapsed = false;
  pathName: string;
  accountType: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.pathName = this.router.url
    console.log(this.pathName);
    if(window.sessionStorage.getItem("isAdmin")=="true"){
      this.accountType = "ADMIN"
    } else {
      this.accountType = "USER"
    }
    
  }

  toggleMenu() {
    if (this.isOpened) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  navigateTo(path: any) {
    this.router.navigate([path])
    this.pathName = path;
  }

  logout() {
    this.router.navigate(['/login'])
  }

}
