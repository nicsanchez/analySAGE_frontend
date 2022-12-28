import { preProcessStatisticsData } from './../../../../utils/preprocessStatisticsData';
import { PresentationService } from './../../../services/presentation.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnswersService } from 'src/app/services/answers-service.service';
import { splitStatisticsDataToChart } from 'src/utils/spliStatisticsDataToChart';

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
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
    this.admittedBarChart = splitStatisticsDataToChart(dashboardData);
  }
}
