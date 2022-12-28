import { preProcessStatisticsData } from './../../../../utils/preprocessStatisticsData';
import { AnswersService } from 'src/app/services/answers-service.service';
import { Component } from '@angular/core';
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

  constructor(
    public answersService: AnswersService,
    private dialog: MatDialog
  ) {}

  receiveDataAndSplitItInTwoCharts(data: any) {
    this.filters = data.filters;
    const dashboardData = preProcessStatisticsData(data.right, data.bad);
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
          questionNumber: data.label,
        },
        {
          labels: [],
          dataset: {
            label: datasetLabel,
            data: [],
          },
          title: `${datasetLabel} por departamento`,
          method: this.answersService.getDetailsAnswerByState,
          service: this.answersService,
          type: data.type,
          questionNumber: data.label,
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
          questionNumber: data.label,
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
          questionNumber: data.label,
        },
      ],
      type: data.type,
      questionNumber: data.label,
      filters: this.filters,
    };

    this.dialog.open(DetailsComponent, {
      data: chartsData,
      height: '95%',
      width: '100%',
    });
  }
}
