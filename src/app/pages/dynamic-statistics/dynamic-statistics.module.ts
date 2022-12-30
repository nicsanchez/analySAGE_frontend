import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { DynamicStatisticsComponent } from './dynamic-statistics.component';
import { DynamicStatisticsRoutes } from './dynamic-statistics.routing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [DynamicStatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DynamicStatisticsRoutes),
    ComponentsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class DynamicStatisticsModule {}
