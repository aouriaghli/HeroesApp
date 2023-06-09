import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

//loadChildren se usa para el lazyload
// dominio.com/'' = dominio.com
const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule),
  },
  {
    path:'heroes',
    loadChildren: () => import('./heores/heores.module').then (m => m.HeoresModule),
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch: 'full' // que se ajuste completamente al path vacio
  },
  {
    path:'**', //cualquier otro path
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
