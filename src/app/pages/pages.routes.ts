import { Routes } from "@angular/router";
import { OrdersComponent } from "./admin/orders/orders.component";
import { UsersComponent } from "./admin/users/users.component";
import { ManageProductsComponent } from "./admin/manage-products/manage-products.component";
import { ShippingPriceComponent } from "./admin/shipping-price/shipping-price.component";
export const pagesRoutes: Routes = [
    { path: 'orders', component: OrdersComponent},    
    { path: 'users', component: UsersComponent},
    { path: 'manage-products', component: ManageProductsComponent},
    { path: 'shipping-price', component: ShippingPriceComponent},
]