import { AnswersService } from 'src/app/services/answers-service.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  public filters: any = {};
  public questionsData: any = {
    method: this.answersService.getRightAndBadAnswersQuantity,
    service: this.answersService,
  };

  public firstMiddleData = {
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

  public secondMiddleData = {
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
    const dashboardData = this.preProcessDashboardData(data.right, data.bad);
    const middleLength = Math.max(dashboardData.length / 2, 1);
    const firstChartData = dashboardData.slice(0, middleLength);
    const secondChartData = dashboardData.slice(
      middleLength,
      dashboardData.length
    );
    this.firstMiddleData =
      this.splitDashboardDataInLabelsAndRigthAndBadDatasets(firstChartData);
    this.secondMiddleData =
      this.splitDashboardDataInLabelsAndRigthAndBadDatasets(secondChartData);
  }

  preProcessDashboardData(dataRight: any, dataBad: any) {
    let dashboardData: any = [];
    dataRight.forEach((rightQuestionResult: any) => {
      let badQuestionResult = dataBad.filter(
        (bad: any) => bad.parameter === rightQuestionResult.parameter
      )[0];
      if (badQuestionResult) {
        dashboardData.push([
          rightQuestionResult.parameter,
          rightQuestionResult.count,
          badQuestionResult.count,
        ]);
      } else {
        dashboardData.push([
          rightQuestionResult.parameter,
          rightQuestionResult.count,
          0,
        ]);
      }
    });

    dataBad.forEach((element: any) => {
      let question = dashboardData.filter(
        (question: any) => question[0] === element.parameter
      )[0];
      if (!question) {
        let rightQuestionResult = dataRight.filter(
          (right: any) => right.parameter === element.parameter
        )[0];

        if (rightQuestionResult) {
          dashboardData.push([
            element.parameter,
            rightQuestionResult.count,
            element.count,
          ]);
        } else {
          dashboardData.push([element.parameter, 0, element.count]);
        }
      }
    });

    return dashboardData.sort((a: any, b: any) => a[0] - b[0]);
  }

  splitDashboardDataInLabelsAndRigthAndBadDatasets(dashboardData: any) {
    const labels = dashboardData.map((element: any) => {
      return element[0];
    });

    const rightAnswersQuantity = dashboardData.map((element: any) => {
      return element[1];
    });

    const badAnswersQuantity = dashboardData.map((element: any) => {
      return element[2];
    });

    const childChartObject = {
      right: {
        label: 'Cantidad de estudiantes que acertaron',
        data: rightAnswersQuantity,
        color: '#026937',
      },
      bad: {
        label: 'Cantidad de estudiantes que erraron',
        data: badAnswersQuantity,
        color: '#af1717',
      },
      title: 'Primera parte del examen de admisión',
      labels: labels,
    };
    return childChartObject;
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
