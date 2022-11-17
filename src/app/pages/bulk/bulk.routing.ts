import { Routes } from '@angular/router';
import { BulkComponent } from './bulk.component';

export const BulkRoutes: Routes = [
  {
    path: 'bulk',
    children: [
      {
        path: '',
        component: BulkComponent,
      },
    ],
  },
];
