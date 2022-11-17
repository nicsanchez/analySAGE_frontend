import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkComponent } from './bulk.component';
import { BulkRoutes } from './bulk.routing';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    BulkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BulkRoutes),
    ComponentsModule
  ]
})
export class BulkModule { }
