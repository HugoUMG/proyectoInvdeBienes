import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage)
  },
  {
    path: 'adquisiciones',
    loadComponent: () =>
      import('./features/adquisiciones/pages/adquisiciones.page').then((m) => m.AdquisicionesPage)
  },
  {
    path: 'inventario',
    loadComponent: () => import('./features/inventario/pages/inventario.page').then((m) => m.InventarioPage)
  },
  {
    path: 'asignaciones',
    loadComponent: () =>
      import('./features/asignaciones/pages/asignaciones.page').then((m) => m.AsignacionesPage)
  },
  {
    path: 'bajas',
    loadComponent: () => import('./features/bajas/pages/bajas.page').then((m) => m.BajasPage)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./features/reportes/pages/reportes.page').then((m) => m.ReportesPage)
  }
];
