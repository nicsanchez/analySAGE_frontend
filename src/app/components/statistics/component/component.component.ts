import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PresentationService } from 'src/app/services/presentation.service';
import { preProcessStatisticsData } from 'src/utils/preprocessStatisticsData';
import { splitStatisticsDataToChart } from 'src/utils/spliStatisticsDataToChart';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
})
export class ComponentComponent {
  public filters: any = {};
  public componentData: any = {
    method: this.presentationService.getAverageExamComponent,
    service: this.presentationService,
  };
  public componentBarChart: any = {
    right: {
      label: 'Lectura crítica',
      data: [],
      color: '#026937',
    },
    bad: {
      label: 'Razonamiento lógico',
      data: [],
      color: '#8dc63f',
    },
    title: 'Promedio de componente por facultad',
    labels: [],
    mainAxis: 'y',
  };

  public keyStatistics: any = [
    {
      label: 'Facultad con mejor promedio en lectura crítica',
      data: '',
    },
    {
      label: 'Facultad con mejor promedio en razonamiento lógico',
      data: '',
    },
  ];

  @Input() active: boolean = false;

  constructor(
    public presentationService: PresentationService,
    private dialog: MatDialog
  ) {}

  receiveDataAndProcessIt(data: any) {
    this.filters = data.filters;
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
    this.componentBarChart = splitStatisticsDataToChart(dashboardData);
    this.processDataAndGetKeyStatistics(data.right, data.bad);
  }

  processDataAndGetKeyStatistics(rights: any, bads: any) {
    let keyMax: string[] = ['', ''];
    if (rights.length > 0 && bads.length > 0) {
      keyMax[0] = rights.find(
        (right: any) =>
          right.count == Math.max(...rights.map((o: any) => o.count), 0)
      ).parameter;
      keyMax[1] = bads.find(
        (right: any) =>
          right.count == Math.max(...bads.map((o: any) => o.count), 0)
      ).parameter;
    }
    for (let i = 0; i < this.keyStatistics.length; i++) {
      this.keyStatistics[i].data = keyMax[i];
    }
  }

  showAverageDetails(data: any) {
    const type = !data.type ? 'lectura critica' : 'razonamiento lógico';
    const datasetLabel = `Promedio de puntaje en ${type}`;
    const chartsData = {
      title: `Detalle del componente ${type} - ${data.label.toLowerCase()}`,
      charts: [
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por versión`,
          method:
            this.presentationService.getDetailsAverageExamComponentByVersion,
          service: this.presentationService,
          type: data.type,
          property: data.label,
          typeChart: 'bar',
          cssClass: 'col-6',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por estrato social`,
          method:
            this.presentationService.getDetailsAverageExamComponentByStratum,
          service: this.presentationService,
          type: data.type,
          property: data.label,
          typeChart: 'bar',
          cssClass: 'col-6',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por departamento de residencia`,
          method:
            this.presentationService.getDetailsAverageExamComponentByState,
          service: this.presentationService,
          type: data.type,
          property: data.label,
          typeChart: 'bar',
          mainAxis: 'y',
          cssClass: 'col-12',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por programa`,
          method:
            this.presentationService.getDetailsAverageExamComponentByProgram,
          service: this.presentationService,
          type: data.type,
          property: data.label,
          typeChart: 'bar',
          mainAxis: 'y',
          cssClass: 'col-12',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por tipo de registro`,
          method:
            this.presentationService
              .getDetailsAverageExamComponentByRegistrationType,
          service: this.presentationService,
          type: data.type,
          property: data.label,
          typeChart: 'pie',
          cssClass: 'col-6',
        },
      ],
      filters: this.filters,
    };

    this.dialog.open(DetailsComponent, {
      data: chartsData,
      height: '95%',
      width: '100%',
    });
  }
}
