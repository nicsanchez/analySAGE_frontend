import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
  constructor(private configurationService: ConfigurationService) {}

  public municipalityData = {
    card: {
      title: 'Carga masiva de municipios',
      confirmMessage: `Estas a punto de ingresar nuevos municipios al sistema`,
      callback: this.configurationService.saveMunicipalityAttachment,
      service: this.configurationService,
      showSemester: false,
    },
    title: 'Parametrización de municipios',
    description: `El objetivo de este cargue masivo es configurar en base de datos
    continentes, paises, departamentos y municipios de los cuales tomará como referencia
    para la carga masiva de participantes al examen de admisión.`,
  };

  public schoolData = {
    card: {
      title: 'Carga masiva de colegios',
      confirmMessage: `Estas a punto de ingresar nuevos colegios al sistema`,
      callback: this.configurationService.saveSchoolAttachment,
      service: this.configurationService,
      showSemester: false,
    },
    title: 'Parametrización de colegios',
    description: `El objetivo de este cargue masivo es configurar en base de datos
    los colegios almacenados en MOISES, los cuales tomará como referencia para la
    carga masiva de participantes al examen de admision.`,
  };

  public ProgramData = {
    card: {
      title: 'Carga masiva de programas',
      confirmMessage: `Estas a punto de ingresar nuevos programas al sistema`,
      callback: this.configurationService.saveProgramAttachment,
      service: this.configurationService,
      showSemester: false,
    },
    title: 'Parametrización de programas',
    description: `El objetivo de este cargue masivo es configurar en base de datos
    los programas almacenados en MOISES, los cuales tomará como referencia para la
    carga masiva de participantes al examen de admision.`,
  };
}
