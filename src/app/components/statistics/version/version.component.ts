import { preProcessStatisticsData } from './../../../../utils/preprocessStatisticsData';
import { PresentationService } from './../../../services/presentation.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { splitStatisticsDataToChart } from 'src/utils/spliStatisticsDataToChart';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
})
export class VersionComponent {
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
  };
  constructor(
    public presentationService: PresentationService,
    private dialog: MatDialog
  ) {}

  receiveDataAndProcessIt(data: any) {
    this.filters = data.filters;
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
    this.admittedBarChart = splitStatisticsDataToChart(dashboardData);
  }

  showAdmittedDetails(data: any) {
    const type = !data.type ? 'admitidos' : 'no admitidos';
    const datasetLabel = `Cantidad de ${type}`;
    const chartsData = {
      title: `Detalle de ${type} de la ${data.label.toLowerCase()}`,
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
          typeChart: 'pie',
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
