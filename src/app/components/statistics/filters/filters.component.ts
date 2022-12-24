import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  public form: any;
  @Input() data: any;

  constructor(private fb: FormBuilder, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      semester: ['', Validators.required],
      journey: ['', Validators.required],
      gender: [''],
      stratum: [''],
      firstOptionProgram: [''],
      secondOptionProgram: [''],
      continent: [''],
      country: [''],
      state: [''],
      municipality: [''],
      schoolNaturalness: [''],
      school: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.data.method.subscribe(
        (response: any) => {
          if (response.status == 200) {
            console.log('emitir información');
          } else {
            this.toastrService.error(
              'No fue posible obtenerse la información solicitada.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrió un error al obtenerse la información solicitada.',
            'Error'
          );
        }
      );
    }
  }
}
