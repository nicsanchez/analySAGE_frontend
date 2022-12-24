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
import { VersionComponent } from './statistics/version/version.component';
import { FiltersComponent } from './statistics/filters/filters.component';

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
    VersionComponent,
    FiltersComponent,
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
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    UserFormComponent,
    BulkCardComponent,
    QuestionsComponent,
    VersionComponent,
    FiltersComponent,
  ],
})
export class ComponentsModule {}
