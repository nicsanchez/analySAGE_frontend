import { Component, ViewChild, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
})
export class VersionComponent implements AfterViewInit {
  @ViewChild('rightAnswersByVersion') private rightAnswersByVersion: any;
  public barErrorGraphChart: any;

  ngAfterViewInit(): void {
    this.setGraphs();
  }

  setGraphs() {
    const ctx = this.rightAnswersByVersion.nativeElement;
    const errorData = {
      label: 'Cantidad de aciertos por jornada para pregunta 40',
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
      ],
    };

    this.barErrorGraphChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31',
          '32',
          '33',
          '34',
          '35',
          '36',
          '37',
          '38',
          '39',
          '40',
        ],
        datasets: [
          { label: errorData.label, data: errorData.data },
          { label: errorData.label, data: errorData.data },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
      },
    });
  }
}
