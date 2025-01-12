import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ProductPageComponent } from "./product-page/product-page.component";

export const pagesRoutes: Routes = [
    { path: '', component:HomeComponent,pathMatch:"full"},
    {path:'products',component:ProductsComponent},
    {path:'products/:id',component:ProductPageComponent}
]