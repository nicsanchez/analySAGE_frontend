import { FacultyService } from './../../../services/faculty.service';
import { ContinentService } from './../../../services/continent.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
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
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnChanges {
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

  public selectWithFilters: any = {
    firstOptionFaculties: new ReplaySubject<any[]>(1),
    firstOptionPrograms: new ReplaySubject<any[]>(1),
    secondOptionFaculties: new ReplaySubject<any[]>(1),
    secondOptionPrograms: new ReplaySubject<any[]>(1),
    residenceCountries: new ReplaySubject<any[]>(1),
    residenceStates: new ReplaySubject<any[]>(1),
    residenceMunicipalities: new ReplaySubject<any[]>(1),
    schoolCountries: new ReplaySubject<any[]>(1),
    schoolStates: new ReplaySubject<any[]>(1),
    schoolMunicipalities: new ReplaySubject<any[]>(1),
    schools: new ReplaySubject<any[]>(1),
  };

  public locations: any = {
    residence: {
      labels: ['municipality', 'state', 'country'],
      data: [],
    },
    school: {
      labels: ['school', 'schoolMunicipality', 'schoolState', 'schoolCountry'],
      data: [],
    },
  };
  public loading: boolean = false;
  public firstOpenTab: boolean = false;

  @Input() data: any;
  @Input() active: boolean = false;
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
    this.buildForm();
  }

  ngOnChanges() {
    if (this.active && !this.firstOpenTab) {
      this.getIndependentFilters();
      this.getDashboardData({});
      this.firstOpenTab = true;
    }
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      semester: ['', Validators.required],
      journey: ['', this.data.journeyRequired ? Validators.required : []],
      gender: [''],
      stratum: [''],
      firstOptionFaculty: [''],
      firstOptionProgram: [''],
      secondOptionFaculty: [''],
      secondOptionProgram: [''],
      continent: [''],
      country: [''],
      state: [''],
      municipality: [''],
      schoolContinent: [''],
      schoolCountry: [''],
      schoolState: [''],
      schoolMunicipality: [''],
      schoolNaturalness: [''],
      school: [''],
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
          this.locations.residence.data[3] = response.data;
          this.locations.school.data[4] = response.data;
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
    this.form.controls['journey'].setValue('');
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
      ? this.form.controls['firstOptionProgram'].setValue('')
      : this.form.controls['secondOptionProgram'].setValue('');
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

  getAllCountriesByContinent(
    idContinent: any,
    key: string,
    index: number,
    dataIndex: number
  ) {
    this.resetAndRestoreSelects(index, key);
    if (idContinent) {
      const data = {
        token: localStorage.getItem('token'),
        idContinent,
      };
      this.countryService.getAllCountriesByContinent(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.locations[key].data[dataIndex] = response.data;
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

  getAllStatesByCountry(
    idCountry: any,
    key: string,
    index: any,
    dataIndex: number
  ) {
    this.resetAndRestoreSelects(index, key);
    if (idCountry) {
      const data = {
        token: localStorage.getItem('token'),
        idCountry,
      };
      this.stateService.getAllStatesByCountry(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.locations[key].data[dataIndex] = response.data;
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

  getAllMunicipalitiesByState(
    idState: any,
    key: string,
    index: number,
    dataIndex: number
  ) {
    this.resetAndRestoreSelects(index, key);
    if (idState) {
      const data = {
        token: localStorage.getItem('token'),
        idState,
      };
      this.municipalityService.getAllMunicipalitiesByState(data).subscribe(
        (response: any) => {
          if (response.status == 200) {
            this.locations[key].data[dataIndex] = response.data;
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

  getAllSchoolsByNaturalnessAndLocation() {
    const data = {
      token: localStorage.getItem('token'),
      idContinent: this.form.controls['schoolContinent'].value,
      idCountry: this.form.controls['schoolCountry'].value,
      idState: this.form.controls['schoolState'].value,
      idMunicipality: this.form.controls['schoolMunicipality'].value,
      naturalness: this.form.controls['schoolNaturalness'].value,
    };
    this.resetAndRestoreSelects(1, 'school');
    this.schoolService.getAllSchoolsByNaturalnessAndLocation(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.locations['school'].data[0] = response.data;
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

  resetAndRestoreSelects(position: number, type: string) {
    for (let i = 0; i < position; i++) {
      this.locations[type].data[i] = [];
      this.form.controls[this.locations[type].labels[i]].setValue(undefined);
    }
  }

  setFilteredData(filtered: any, key: string) {
    this.selectWithFilters[key] = filtered.data;
  }
}
