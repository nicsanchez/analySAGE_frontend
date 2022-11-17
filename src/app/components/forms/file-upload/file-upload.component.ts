import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  public loading: boolean = false;
  public title: string = '';
  public nextStep: string = '';
  public form: any;
  public formDataAttachment = new FormData();
  public attachmentConditions: any;

  constructor(
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.attachmentConditions = this.data.attachmentConditions;
    this.nextStep = this.data.nextStep;
    this.buildForm();
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
    });
  }

  /* Método para validar la extensión y tamaño maximo del archivo adjunto*/
  onChangeFileInput() {
    this.formDataAttachment = new FormData();
    if (
      !this.attachmentConditions.accept
        .split(',')
        .includes(this.form.controls['file'].value.type)
    ) {
      this.form.controls['file'].setValue(null);
      this.toastrService.error(
        `El archivo adjunto no es permitido, solo se admiten archivos con formato: ${this.attachmentConditions.accept}`
      );
    } else if (
      this.form.controls['file'].value.size / 1000000 >
      this.attachmentConditions.size
    ) {
      this.form.controls['file'].setValue(null);
      this.toastrService.error(
        `El archivo adjunto supera el peso maximo ${this.attachmentConditions.size} Mb`
      );
    } else {
      this.formDataAttachment.append('file', this.form.controls['file'].value);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.dialog
        .open(ConfirmComponent, {
          width: '300px',
          disableClose: true,
          data: {
            message: this.data.confirm.message,
          },
        })
        .afterClosed()
        .subscribe((option: boolean) => {
          if (option) {
            this.switchRequest();
          } else {
            this.loading = false;
          }
        });
    }
  }

  switchRequest() {
    this.data.callback(this.formDataAttachment, this.data.service).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.status == 200) {
          if (response.errors && response.errors.length) {
            this.dialog.open(ErrorComponent, {
              width: '500px',
              disableClose: true,
              data: {
                errors: response.errors,
                description:'Los siguientes son errores de validación',
                headers: ['Fila', 'Descripción del error'],
              },
            });
            this.toastrService.warning(
              'Se ha llevado a cabo la solicitud con algunas advertencias.',
              'Advertencia'
            );
          } else {
            this.toastrService.success(
              'Se ha llevado a cabo la solicitud exitosamente',
              'Exito'
            );
          }
          this.dialogRef.close('ok');
        } else {
          this.toastrService.error(
            'No fue posible llevarse a cabo la solicitud requerida.',
            'Error'
          );
        }
      },
      () => {
        this.loading = false;
        this.toastrService.error(
          'Ocurrió un error llevarse a cabo la solicitud requerida.',
          'Error'
        );
      }
    );
  }
}
