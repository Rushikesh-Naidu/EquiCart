import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { CartComponent } from './cart/cart.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: SideNavBarComponent,
        children:[
            {
                path:'home',
                component: HomeComponent
            },
            {
                path:'profile',
                component: ProfileComponent
            },
            {
                path: 'my_orders',
                component: OrdersComponent
            },
            {
                path: 'address_book',
                component: AddressBookComponent
            },
            {
                path: 'cart',
                component: CartComponent,
            }
        ]
    }
];
