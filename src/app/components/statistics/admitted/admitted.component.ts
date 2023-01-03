import { preProcessStatisticsData } from './../../../../utils/preprocessStatisticsData';
import { PresentationService } from './../../../services/presentation.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { splitStatisticsDataToChart } from 'src/utils/spliStatisticsDataToChart';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-admitted',
  templateUrl: './admitted.component.html',
})
export class AdmittedComponent {
  public filters: any = {};
  public admittedData: any = {
    method: this.presentationService.getAdmittedOrUnAdmittedPeople,
    service: this.presentationService,
  };
  public admittedBarChart: any = {
    right: {
      label: 'Cantidad de estudiantes admitidos',
      data: [],
      color: '#026937',
    },
    bad: {
      label: 'Cantidad de estudiantes no admitidos',
      data: [],
      color: '#af1717',
    },
    title: 'Admitidos por facultad',
    labels: [],
    mainAxis: 'y',
  };

  public keyStatistics: any = [
    { label: 'Total Aspirantes', data: 0 },
    { label: 'Total Admitidos', data: 0 },
    { label: 'Total No Admitidos', data: 0 },
  ];

  @Input() active: boolean = false;

  constructor(
    public presentationService: PresentationService,
    private dialog: MatDialog
  ) {}

  receiveDataAndProcessIt(data: any) {
    this.filters = data.filters;
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
    this.admittedBarChart = splitStatisticsDataToChart(dashboardData);
    this.processDataAndGetKeyStatistics(data.right, data.bad);
  }

  showAdmittedDetails(data: any) {
    const type = !data.type ? 'admitidos' : 'no admitidos';
    const datasetLabel = `Cantidad de ${type}`;
    const chartsData = {
      title: `Detalle de ${type} - ${data.label.toLowerCase()}`,
      charts: [
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por versión`,
          method:
            this.presentationService
              .getDetailsAdmittedOrUnAdmittedPeopleByVersion,
          service: this.presentationService,
          type: data.type ? 0 : 1,
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
            this.presentationService
              .getDetailsAdmittedOrUnAdmittedPeopleByStratum,
          service: this.presentationService,
          type: data.type ? 0 : 1,
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
            this.presentationService
              .getDetailsAdmittedOrUnAdmittedPeopleByState,
          service: this.presentationService,
          type: data.type ? 0 : 1,
          property: data.label,
          typeChart: 'pie',
          legendPosition: 'top',
          cssClass: 'col-7',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por programa`,
          method:
            this.presentationService
              .getDetailsAdmittedOrUnAdmittedPeopleByProgram,
          service: this.presentationService,
          type: data.type ? 0 : 1,
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
          title: `${datasetLabel} por tipo de inscripción`,
          method:
            this.presentationService
              .getDetailsAdmittedOrUnAdmittedPeopleByRegistrationType,
          service: this.presentationService,
          type: data.type ? 0 : 1,
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

  processDataAndGetKeyStatistics(admitted: any, unadmitted: any) {
    let keyTotal: number[] = [0, 0, 0];
    if (admitted.length > 0 && unadmitted.length > 0) {
      admitted.forEach((faculty: any) => {
        keyTotal[0] += faculty.count;
        keyTotal[1] += faculty.count;
      });

      unadmitted.forEach((faculty: any) => {
        keyTotal[0] += faculty.count;
        keyTotal[2] += faculty.count;
      });
    }

    for (let i = 0; i < this.keyStatistics.length; i++) {
      this.keyStatistics[i].data = keyTotal[i];
    }
  }
}
