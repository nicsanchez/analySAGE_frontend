import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

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

  ngAfterViewInit(): void {
    this.setGraphs();
    this.setData();
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
          { label: rightDataFirst.label, data: rightDataFirst.data },
          { label: errorDataFirst.label, data: errorDataFirst.data },
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
          { label: rightDataSecond.label, data: rightDataSecond.data },
          { label: errorDataSecond.label, data: errorDataSecond.data },
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

  setData() {
    this.barErrorGraphChartFirst.data.labels = [1, 2, 3];
    this.barErrorGraphChartFirst.data.datasets[0].data = [15, 21, 32];
    this.barErrorGraphChartFirst.data.datasets[1].data = [25, 45, 1];
  }
}
