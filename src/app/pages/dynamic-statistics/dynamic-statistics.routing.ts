import { Routes } from '@angular/router';
import { DynamicStatisticsComponent } from './dynamic-statistics.component';

export const DynamicStatisticsRoutes: Routes = [
  {
    path: 'dynamicStatistics',
    children: [
      {
        path: '',
        component: DynamicStatisticsComponent,
      },
    ],
  },
];
