import { Routes } from '@angular/router';
import { LayoutComponent as admin } from './pages/admin/layout/layout.component';
import { LayoutComponent as user } from './pages/user/layout/layout.component';
import { LayoutComponent as auth } from './pages/auth/layout/layout.component';



export const routes: Routes = [
    {
        path:'',
        component: user,
        loadChildren:()=> import('./pages/user/pages.routes').then(m=>m.pagesRoutes)
    },
    {
        path : 'admin',
        component : admin,
        loadChildren: () => import('./pages/pages.routes').then(m => m.pagesRoutes)
    },
    {
        path : 'auth',
        component : auth,
        loadChildren: () => import('./pages/auth/pages.routes').then(m => m.pagesRoutes)
    }
];
