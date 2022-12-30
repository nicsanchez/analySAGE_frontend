import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UsersLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [PermissionsGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/users/users.module').then((x) => x.UsersModule),
          },
          {
            path: '',
            loadChildren: () =>
              import('./pages/logs/logs.module').then((x) => x.LogsModule),
          },
          {
            path: '',
            loadChildren: () =>
              import('./pages/bulk/bulk.module').then((x) => x.BulkModule),
          },
          {
            path: '',
            loadChildren: () =>
              import('./pages/configuration/configuration.module').then(
                (x) => x.ConfigurationModule
              ),
          },
        ],
      },
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/my-profile/my-profile.module').then(
                (x) => x.MyProfileModule
              ),
          },
          {
            path: '',
            loadChildren: () =>
              import(
                './pages/dynamic-statistics/dynamic-statistics.module'
              ).then((x) => x.DynamicStatisticsModule),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/login/login.module').then((x) => x.LoginModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
