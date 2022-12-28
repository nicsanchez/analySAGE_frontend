import { FacultyService } from './../../../services/faculty.service';
import { ContinentService } from './../../../services/continent.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from 'src/app/services/country.service';
import { GenderService } from 'src/app/services/gender.service';
import { JourneyService } from 'src/app/services/journey.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { ProgramService } from 'src/app/services/program.service';
import { SchoolService } from 'src/app/services/school.service';
import { SemesterService } from 'src/app/services/semester.service';
import { StateService } from 'src/app/services/state.service';
import { StratumService } from 'src/app/services/stratum.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  public form: any;
  public semesters: any = [];
  public journeys: any = [];
  public stratums: any = [];
  public genders: any = [];
  public faculties: any = [];
  public firstPrograms: any = [];
  public secondPrograms: any = [];
  public continents: any = [];
  public countries: any = [];
  public states: any = [];
  public municipalities: any = [];
  public naturalnesses: any = [];
  public schools: any = [];
  public loading: boolean = false;

  @Input() data: any;
  @Output() dashboardData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private journeyService: JourneyService,
    private countryService: CountryService,
    private continentService: ContinentService,
    private genderService: GenderService,
    private municipalityService: MunicipalityService,
    private programService: ProgramService,
    private schoolService: SchoolService,
    private semesterService: SemesterService,
    private stratumService: StratumService,
    private stateService: StateService,
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.getIndependentFilters();
    this.buildForm();
    this.getDashboardData({});
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      semester: [undefined, Validators.required],
      journey: [
        undefined,
        this.data.journeyRequired ? Validators.required : [],
      ],
      gender: [undefined],
      stratum: [undefined],
      firstOptionFaculty: [undefined],
      firstOptionProgram: [undefined],
      secondOptionFaculty: [undefined],
      secondOptionProgram: [undefined],
      continent: [undefined],
      country: [undefined],
      state: [undefined],
      municipality: [undefined],
      schoolNaturalness: [undefined],
      school: [undefined],
    });
  }

  onSubmit() {
    const data = this.form.value;
    if (this.form.valid) {
      this.getDashboardData(data);
    }
  }

  getDashboardData(data: any) {
    this.loading = true;
    this.data.method(data, this.data.service).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.status == 200) {
          this.dashboardData.emit({
            right: response.right,
            bad: response.bad,
            filters: data,
          });
        } else {
          this.toastrService.error(
            'No fue posible obtenerse la información solicitada.',
            'Error'
          );
        }
      },
      () => {
        this.loading = false;
        this.toastrService.error(
          'Ocurrió un error al obtenerse la información solicitada.',
          'Error'
        );
      }
    );
  }

  getIndependentFilters() {
    const token = localStorage.getItem('token');
    this.getAllSemesters(token);
    this.getAllStratums(token);
    this.getAllGenders(token);
    this.getAllContinents(token);
    this.getAllNaturalness(token);
    this.getAllFaculties(token);
  }

  getAllSemesters(token: any) {
    const data: any = {
      token,
    };
    this.semesterService.getAllSemesters(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.semesters = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse los semestres del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse los semestres del sistema.',
          'Error'
        );
      }
    );
  }

  getAllStratums(token: any) {
    const data: any = {
      token,
    };
    this.stratumService.getAllStratums(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.stratums = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse los estratos del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse los estratos del sistema.',
          'Error'
        );
      }
    );
  }

  getAllGenders(token: any) {
    const data: any = {
      token,
    };
    this.genderService.getAllGenders(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.genders = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse los géneros del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse los géneros del sistema.',
          'Error'
        );
      }
    );
  }

  getAllContinents(token: any) {
    const data: any = {
      token,
    };
    this.continentService.getAllContinents(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.continents = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse los continentes del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse los continentes del sistema.',
          'Error'
        );
      }
    );
  }

  getAllNaturalness(token: any) {
    const data: any = {
      token,
    };
    this.schoolService.getAllNaturalness(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.naturalnesses = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse las naturalidades de los colegios del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse las naturalidades de los colegios del sistema.',
          'Error'
        );
      }
    );
  }

  getAllFaculties(token: any) {
    const data: any = {
      token,
    };
    this.facultyService.getAllFaculties(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.faculties = response.data;
        } else {
          this.toastrService.error(
            'No fue posible obtenerse las naturalidades de las facultades del sistema.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse las naturalidades de las facultades del sistema.',
          'Error'
        );
      }
    );
  }

  getAllJourneys() {
    const idSemester = this.form.controls['semester'].value;
    this.form.controls['journey'].setValue(undefined);
    if (idSemester) {
      const data = {
        token: localStorage.getItem('token'),
        idSemester,
      };
      this.journeyService.getAllJourneys(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.journeys = response.data;
          } else {
            this.toastrService.error(
              'No fue posible obtenerse las jornadas del semestre seleccionado.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse las jornadas del semestre seleccionado.',
            'Error'
          );
        }
      );
    } else {
      this.journeys = [];
    }
  }

  getProgramsByFaculty(idFaculty: any, type: any) {
    type === 'first'
      ? this.form.controls['firstOptionProgram'].setValue(undefined)
      : this.form.controls['secondOptionProgram'].setValue(undefined);
    if (idFaculty) {
      const data = {
        token: localStorage.getItem('token'),
        idFaculty,
      };
      this.programService.getProgramsByFaculty(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            type === 'first'
              ? (this.firstPrograms = response.data)
              : (this.secondPrograms = response.data);
          } else {
            this.toastrService.error(
              'No fue posible obtenerse los programas de la facultad seleccionada.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse los programas de la facultad seleccionada.',
            'Error'
          );
        }
      );
    } else {
      type === 'first' ? (this.firstPrograms = []) : (this.secondPrograms = []);
    }
  }

  getAllCountriesByContinent() {
    const idContinent = this.form.controls['continent'].value;
    this.form.controls['country'].setValue(undefined);
    this.countries = [];
    this.form.controls['state'].setValue(undefined);
    this.states = [];
    this.form.controls['municipality'].setValue(undefined);
    this.municipalities = [];
    this.form.controls['school'].setValue(undefined);
    this.schools = [];
    if (idContinent) {
      const data = {
        token: localStorage.getItem('token'),
        idContinent,
      };
      this.countryService.getAllCountriesByContinent(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.countries = response.data;
          } else {
            this.toastrService.error(
              'No fue posible obtenerse los paises del continente seleccionado',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse los paises del continente seleccionado.',
            'Error'
          );
        }
      );
    }
  }

  getAllStatesByCountry() {
    const idCountry = this.form.controls['country'].value;
    this.form.controls['state'].setValue(undefined);
    this.states = [];
    this.form.controls['municipality'].setValue(undefined);
    this.municipalities = [];
    this.form.controls['school'].setValue(undefined);
    this.schools = [];
    if (idCountry) {
      const data = {
        token: localStorage.getItem('token'),
        idCountry,
      };
      this.stateService.getAllStatesByCountry(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.states = response.data;
          } else {
            this.toastrService.error(
              'No fue posible obtenerse los departamentos del pais seleccionado.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse los departamentos del pais seleccionado.',
            'Error'
          );
        }
      );
    }
  }

  getAllMunicipalitiesByState() {
    const idState = this.form.controls['state'].value;
    this.form.controls['municipality'].setValue(undefined);
    this.municipalities = [];
    this.form.controls['school'].setValue(undefined);
    this.schools = [];
    if (idState) {
      const data = {
        token: localStorage.getItem('token'),
        idState,
      };
      this.municipalityService.getAllMunicipalitiesByState(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.municipalities = response.data;
          } else {
            this.toastrService.error(
              'No fue posible obtenerse los municipios del departamento seleccionado.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrio un error al obtenerse los municipios del departamento seleccionado.',
            'Error'
          );
        }
      );
    }
  }

  getAllSchoolsByNaturalnessAndMunicipality() {
    const idMunicipality = this.form.controls['municipality'].value;
    const schoolNaturalness = this.form.controls['schoolNaturalness'].value;
    this.form.controls['school'].setValue(undefined);
    this.schools = [];
    if (idMunicipality || schoolNaturalness) {
      const data = {
        token: localStorage.getItem('token'),
        idMunicipality,
        schoolNaturalness,
      };
      this.schoolService
        .getAllSchoolsByNaturalnessAndMunicipality(data)
        .subscribe(
          (response: any) => {
            if (response.status == 200) {
              this.schools = response.data;
            } else {
              this.toastrService.error(
                'No fue posible obtenerse los colegios asociados.',
                'Error'
              );
            }
          },
          () => {
            this.toastrService.error(
              'Ocurrio un error al obtenerse los colegios asociados.',
              'Error'
            );
          }
        );
    }
  }
}
