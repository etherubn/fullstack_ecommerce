import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";


export const pagesRoutes: Routes = [
    {path:"register",component:RegisterComponent},
    {path:"sign-up",component:LoginComponent}
]