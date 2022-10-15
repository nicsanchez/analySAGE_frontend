import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public form: any;
  public roles: any;
  public loading: boolean = false;
  public method: any;
  public message: string = '';
  @Input() data: any;
  @Input() dialogRef: any;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.getMyInformation();
    this.getAllRoles();
    this.buildForm();
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      name: [
        this.data.user ? this.data.user.name : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$'),
        ],
      ],
      lastname: [
        this.data.user ? this.data.user.lastname : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$'),
        ],
      ],
      email: [
        this.data.user ? this.data.user.email : '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      document: [
        this.data.user ? this.data.user.document : '',
        [
          Validators.required,
          Validators.min(100000),
          Validators.max(999999999999999),
        ],
      ],
      username: [
        this.data.user ? this.data.user.username : '',
        [Validators.required],
      ],
      password: [
        '',
        this.data.user || this.data.personal ? [] : [Validators.required],
      ],
      rol: [
        this.data.user ? this.data.user.rol : '',
        this.data.personal ? [] : [Validators.required],
      ],
    });
  }

  /* Método para obtener los roles registrados en el aplicativo */
  getAllRoles() {
    let data = {
      token: localStorage.getItem('token'),
    };
    this.rolesService.getAllRoles(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.roles = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse los roles de usuario.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrió un error al obtenerse los roles de usuario.',
          'Error'
        );
      }
    );
  }

  /* Metodo usado para enviar el formulario */
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.switchMethod();
      this.dialog
        .open(ConfirmComponent, {
          width: '300px',
          disableClose: true,
          data: {
            message: this.message,
          },
        })
        .afterClosed()
        .subscribe((option: boolean) => {
          if (option) {
            this.callBackendService();
          } else {
            this.loading = false;
          }
        });
    }
  }

  /* Método escoger la api de consumo */
  switchMethod() {
    const data = {
      token: localStorage.getItem('token'),
      data: {
        id: this.data.user ? this.data.user.id : '',
        username: this.form.controls['username'].value,
        name: this.form.controls['name'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        document: this.form.controls['document'].value,
        rol: this.form.controls['rol'].value,
      },
    };
    if (this.data.personal) {
      this.method = this.userService.updatePersonalData(data);
      this.message = 'Estas a punto de actualizar tu información personal.';
    } else {
      if (this.data.user) {
        this.method = this.userService.updateUser(data);
        this.message = `Estas a punto de actualizar la información personal del usuario ${this.form.controls['username'].value}.`;
      } else {
        this.method = this.userService.createUser(data);
        this.message = `Estas a punto darle acceso al aplicativo al usuario ${this.form.controls['username'].value}.`;
      }
    }
  }

  /* Método para realizar llamado al backend */
  callBackendService() {
    this.method.subscribe(
      (response: any) => {
        this.loading = false;
        if (response.status == 200) {
          this.toastrService.success(
            'Se ha creado el usuario exitosamente',
            'Exito'
          );
          if (this.dialogRef) {
            this.dialogRef.close('ok');
          }
        } else {
          this.toastrService.error(
            'No fue posible crearse el usuario',
            'Error'
          );
        }
      },
      (error: any) => {
        this.loading = false;
        if (error.status == 422) {
          let errors = '<ul>';
          if (error.error.errors['data.username']) {
            errors +=
              '<li>El campo usuario ya está registrado en base de datos.</li>';
          }

          if (error.error.errors['data.email']) {
            errors +=
              '<li>El campo correo electrónico ya está registrado en base de datos.</li>';
          }

          if (error.error.errors['data.document']) {
            errors +=
              '<li>El campo documento ya está registrado en base de datos.</li>';
          }
          errors += '</ul>';
          this.toastrService.error(errors, 'Listado de Errores', {
            closeButton: true,
            enableHtml: true,
          });
        } else {
          this.toastrService.error(
            'Ocurrió un error al crearse el usuario',
            'Error'
          );
        }
      }
    );
  }

  getMyInformation() {
    if (this.data.personal) {
      let data = {
        token: localStorage.getItem('token'),
      };
      this.userService.getUser(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.updateForm(response.data[0]);
          } else {
            this.toastrService.error(
              'No fue posible obtenerse la información personal.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse la información personal.',
            'Error'
          );
        }
      );
    }
  }

  updateForm(data: any) {
    this.form.controls['name'].setValue(data.name);
    this.form.controls['lastname'].setValue(data.lastname);
    this.form.controls['username'].setValue(data.username);
    this.form.controls['email'].setValue(data.email);
    this.form.controls['document'].setValue(data.document);
    this.form.controls['rol'].setValue(data.rol);
    this.form.controls['password'].setValue('');
  }
}
