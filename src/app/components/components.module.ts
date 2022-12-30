import { AdmittedComponent } from './statistics/admitted/admitted.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserFormComponent } from './forms/user/user-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorComponent } from './error/error.component';
import { FileUploadComponent } from './forms/file-upload/file-upload.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatCardModule } from '@angular/material/card';
import { BulkCardComponent } from './bulk-card/bulk-card.component';
import { QuestionsComponent } from './statistics/questions/questions.component';
import { FiltersComponent } from './statistics/filters/filters.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DetailsComponent } from './statistics/details/details.component';
import { KeysComponent } from './statistics/keys/keys.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchSelectComponent } from './search-select/search-select.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    ConfirmComponent,
    UserFormComponent,
    ErrorComponent,
    FileUploadComponent,
    BulkCardComponent,
    QuestionsComponent,
    AdmittedComponent,
    FiltersComponent,
    BarChartComponent,
    PieChartComponent,
    DetailsComponent,
    KeysComponent,
    SearchSelectComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    NgxMatFileInputModule,
    FormsModule,
    MatCardModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    UserFormComponent,
    BulkCardComponent,
    QuestionsComponent,
    AdmittedComponent,
    FiltersComponent,
  ],
})
export class ComponentsModule {}
