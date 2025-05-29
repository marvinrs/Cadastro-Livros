import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'livros',
    loadChildren: () => import('./features/livros/livros.module').then(m => m.LivrosModule)
  },
  {
    path: 'autores',
    loadChildren: () => import('./features/autores/autores.module').then(m => m.AutoresModule)
  },
  {
    path: 'assuntos',
    loadChildren: () => import('./features/assuntos/assuntos.module').then(m => m.AssuntosModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./features/relatorios/relatorios.module').then(m => m.RelatoriosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
