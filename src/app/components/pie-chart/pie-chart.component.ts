import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements AfterViewInit, OnInit {
  @ViewChild('pieChart') private pieChart: any;
  public pieGraph: any;
  public loading = true;

  @Input() data: any;
  @Input() filters: any;

  constructor(private toastrService: ToastrService) {}

  ngAfterViewInit(): void {
    this.setGraph();
  }

  ngOnInit(): void {
    this.getDetailToPieChart();
  }

  setGraph() {
    const ctx = this.pieChart.nativeElement;

    this.pieGraph = new Chart(ctx, {
      type: this.data.typeChart,
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: this.data.dataset.label,
            data: this.data.dataset.data,
            backgroundColor: this.getRandomColor(),
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: this.data.title,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }

  getRandomColor() {
    let colors = [];
    for (let i = 0; i < 20; i++) {
      const letters = '0123456789ABCDEF'.split('');
      let color = '#';
      for (let x = 0; x < 6; x++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
  }

  getDetailToPieChart() {
    if (this.data.method) {
      this.filters.property = this.data.property;
      this.filters.type = this.data.type;
      this.data.method(this.filters, this.data.service).subscribe(
        (response: any) => {
          if (response.status == 200) {
            const dataPieChart = this.preprocessPieDataChart(response.data);
            this.setDataPieChart(dataPieChart[0], dataPieChart[1]);
          } else {
            this.toastrService.error(
              'No fue posible obtenerse la información solicitada.',
              'Error'
            );
          }
        },
        () => {
          this.toastrService.error(
            'Ocurrió un error al obtenerse la información solicitada.',
            'Error'
          );
        }
      );
    }
  }

  preprocessPieDataChart(data: any) {
    const labels: any = [];
    const count: any = [];
    data.forEach((element: any) => {
      labels.push(element.parameter);
      count.push(element.count);
    });

    return [labels, count];
  }

  setDataPieChart(labels: any, data: any) {
    this.loading = false;
    this.pieGraph.data.labels = labels;
    this.pieGraph.data.datasets[0].data = data;
    this.pieGraph.update();
  }
}
