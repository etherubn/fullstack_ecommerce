import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";

export const pagesRoutes: Routes = [
    { path: '', component:HomeComponent,pathMatch:"full"},
    {path:'products',component:ProductsComponent}
]