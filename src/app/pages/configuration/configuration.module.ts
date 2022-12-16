import { ConfigurationRoutes } from './configuration.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigurationRoutes),
    ComponentsModule,
  ],
})
export class ConfigurationModule {}
