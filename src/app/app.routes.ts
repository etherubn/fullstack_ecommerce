import { Routes } from '@angular/router';
import { LayoutComponent as admin } from './pages/admin/layout/layout.component';
import { LayoutComponent as user } from './pages/user/layout/layout.component';



export const routes: Routes = [
    {
        path:"",
        component: user
    },
    {
        path : 'admin',
        component : admin,
        loadChildren: () => import('./pages/pages.routes').then(m => m.pagesRoutes)
    }

];
