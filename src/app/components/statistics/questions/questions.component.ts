import { preProcessStatisticsData } from './../../../../utils/preprocessStatisticsData';
import { AnswersService } from 'src/app/services/answers-service.service';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { splitStatisticsDataToChart } from 'src/utils/spliStatisticsDataToChart';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  public filters: any = {};
  public questionsData: any = {
    journeyRequired: true,
    method: this.answersService.getRightAndBadAnswersQuantity,
    service: this.answersService,
  };

  public firstMiddleData: any = {
    right: {
      label: 'Cantidad de estudiantes que acertaron',
      data: [],
      color: '#026937',
    },
    bad: {
      label: 'Cantidad de estudiantes que erraron',
      data: [],
      color: '#af1717',
    },
    title: 'Primera parte del examen de admisión',
    labels: [],
  };

  public secondMiddleData: any = {
    right: {
      label: 'Cantidad de estudiantes que acertaron',
      data: [],
      color: '#026937',
    },
    bad: {
      label: 'Cantidad de estudiantes que erraron',
      data: [],
      color: '#af1717',
    },
    title: 'Segunda parte del examen de admisión',
    labels: [],
  };

  public keyStatistics: any = [
    { label: 'Pregunta con mayor aciertos', data: 0 },
    { label: 'Pregunta con menor aciertos', data: 0 },
  ];

  @Input() active: boolean = false;

  constructor(
    public answersService: AnswersService,
    private dialog: MatDialog
  ) {}

  receiveDataAndSplitItInTwoCharts(data: any) {
    this.filters = data.filters;
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
    this.processDataAndGetKeyStatistics(data.right, data.bad);
    const middleLength = Math.max(dashboardData.length / 2, 1);
    const firstChartData = dashboardData.slice(0, middleLength);
    const secondChartData = dashboardData.slice(
      middleLength,
      dashboardData.length
    );
    this.firstMiddleData = splitStatisticsDataToChart(firstChartData);
    this.secondMiddleData = splitStatisticsDataToChart(secondChartData);
  }

  showQuestionDetails(data: any) {
    const type = !data.type ? 'aciertos' : 'desaciertos';
    const datasetLabel = `Cantidad de ${type}`;
    const chartsData = {
      title: `Detalle de ${type} de la pregunta #${data.label}`,
      charts: [
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por versión`,
          method: this.answersService.getDetailsAnswerByVersion,
          service: this.answersService,
          type: data.type,
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
          method: this.answersService.getDetailsAnswerByStratum,
          service: this.answersService,
          type: data.type,
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
          method: this.answersService.getDetailsAnswerByState,
          service: this.answersService,
          type: data.type,
          property: data.label,
          typeChart: 'pie',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por facultad de primera opción`,
          method: this.answersService.getDetailsAnswerByFacultyFirstOption,
          service: this.answersService,
          type: data.type,
          property: data.label,
          typeChart: 'pie',
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por tipo de registro`,
          method: this.answersService.getDetailsAnswerByRegistrationType,
          service: this.answersService,
          type: data.type,
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

  processDataAndGetKeyStatistics(rights: any, bads: any) {
    let keyMax: number[] = [0, 0];
    keyMax[0] = rights.find(
      (right: any) =>
        right.count === Math.max(...rights.map((o: any) => o.count), 0)
    ).parameter;
    keyMax[1] = bads.find(
      (right: any) =>
        right.count === Math.max(...bads.map((o: any) => o.count), 0)
    ).parameter;
    for (let i = 0; i < this.keyStatistics.length; i++) {
      this.keyStatistics[i].data = keyMax[i];
    }
  }
}
