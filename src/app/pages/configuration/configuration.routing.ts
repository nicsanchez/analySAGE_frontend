import { ConfigurationComponent } from './configuration.component';
import { Routes } from '@angular/router';

export const ConfigurationRoutes: Routes = [
  {
    path: 'configuration',
    children: [
        {
          path: '',
          component: ConfigurationComponent,
        },
      ],
  },
];
