import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent {
  constructor(private configurationService: ConfigurationService) {}

  public configurationData = {
    card: {
      title: 'Carga masiva de municipios',
      confirmMessage: `Estas a punto de ingresar nuevos municipios al sistema`,
      callback: this.configurationService.saveAttachments,
      service: this.configurationService,
      showSemester: false,
    },
    title: 'Parametrización de municipios',
    description: `El objetivo de este cargue masivo es configurar en base de datos
    continentes, paises, departamentos y municipios de los cuales tomará como referencia
    para la carga masiva de participantes al examen de admisión.`,
  };
}
