import { AnswersService } from 'src/app/services/answers-service.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BADFAMILY } from 'dns';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements AfterViewInit {
  @ViewChild('firstHalfAnswersBySession')
  private firstHalfAnswersBySession: any;
  @ViewChild('secondHalfAnswersBySession')
  private secondHalfAnswersBySession: any;
  public barErrorGraphChartFirst: any;
  public barErrorGraphChartSecond: any;
  public questionsData: any = {
    method: this.answersService.getRightAndBadAnswersQuantity,
    service: this.answersService,
  };

  constructor(public answersService: AnswersService) {}

  ngAfterViewInit(): void {
    this.setGraphs();
  }

  setGraphs() {
    const ctxf = this.firstHalfAnswersBySession.nativeElement;
    const ctxs = this.secondHalfAnswersBySession.nativeElement;
    const rightDataFirst = {
      label: 'Cantidad de estudiantes que acertaron',
      data: [],
    };

    const errorDataFirst = {
      label: 'Cantidad de estudiantes que erraron',
      data: [],
    };

    const rightDataSecond = {
      label: 'Cantidad de estudiantes que acertaron',
      data: [],
    };

    const errorDataSecond = {
      label: 'Cantidad de estudiantes que erraron',
      data: [],
    };

    this.barErrorGraphChartFirst = new Chart(ctxf, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: rightDataFirst.label,
            data: rightDataFirst.data,
            backgroundColor: '#026937',
          },
          {
            label: errorDataFirst.label,
            data: errorDataFirst.data,
            backgroundColor: '#af1717',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Primera parte del examen',
          },
        },
      },
    });

    this.barErrorGraphChartSecond = new Chart(ctxs, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: rightDataSecond.label,
            data: rightDataSecond.data,
            backgroundColor: '#026937',
          },
          {
            label: errorDataSecond.label,
            data: errorDataSecond.data,
            backgroundColor: '#af1717',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Segunda Parte del examen',
          },
        },
      },
    });
  }

  receiveDataAndSplitItInTwoCharts(data: any) {
    const dashboardData = this.preProcessDashboardData(data.right, data.bad);
    const middleLength = Math.max(dashboardData.length / 2, 1);
    const firstChartData = dashboardData.slice(0, middleLength);
    const secondChartData = dashboardData.slice(
      middleLength,
      dashboardData.length
    );
    this.splitDashboardDataInLabelsAndRigthAndBadDatasets(
      firstChartData,
      this.barErrorGraphChartFirst
    );
    this.splitDashboardDataInLabelsAndRigthAndBadDatasets(
      secondChartData,
      this.barErrorGraphChartSecond
    );
  }

  preProcessDashboardData(dataRight: any, dataBad: any) {
    let dashboardData: any = [];
    dataRight.forEach((rightQuestionResult: any) => {
      let badQuestionResult = dataBad.filter(
        (bad: any) => bad.number === rightQuestionResult.number
      )[0];
      if (badQuestionResult) {
        dashboardData.push([
          rightQuestionResult.number,
          rightQuestionResult.count,
          badQuestionResult.count,
        ]);
      } else {
        dashboardData.push([
          rightQuestionResult.number,
          rightQuestionResult.count,
          0,
        ]);
      }
    });

    dataBad.forEach((element: any) => {
      let question = dashboardData.filter(
        (question: any) => question[0] === element.number
      )[0];
      if (!question) {
        let rightQuestionResult = dataRight.filter(
          (right: any) => right.number === element.number
        )[0];

        if (rightQuestionResult) {
          dashboardData.push([
            element.number,
            rightQuestionResult.count,
            element.count,
          ]);
        } else {
          dashboardData.push([element.number, 0, element.count]);
        }
      }
    });

    return dashboardData.sort((a: any, b: any) => a[0] - b[0]);
  }

  splitDashboardDataInLabelsAndRigthAndBadDatasets(
    dashboardData: any,
    chart: any
  ) {
    const labels = dashboardData.map((element: any) => {
      return element[0];
    });

    const rightAnswersQuantity = dashboardData.map((element: any) => {
      return element[1];
    });

    const badAnswersQuantity = dashboardData.map((element: any) => {
      return element[2];
    });

    this.setData(labels, rightAnswersQuantity, badAnswersQuantity, chart);
  }

  setData(
    labels: number[],
    rightDataset: number[],
    badDataset: number[],
    chart: any
  ) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = rightDataset;
    chart.data.datasets[1].data = badDataset;
    chart.update();
  }
}
