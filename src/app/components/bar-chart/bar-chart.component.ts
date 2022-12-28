import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('barChart') private barChart: any;
  public barGraph: any;

  @Input() data: any;
  @Output() outputData: EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit(): void {
    this.setGraphs();
  }

  ngOnChanges() {
    if (this.barGraph) {
      this.barGraph.data.labels = this.data.labels;
      this.barGraph.data.datasets[0].data = this.data.right.data;
      this.barGraph.data.datasets[1].data = this.data.bad.data;
      this.barGraph.update();
    }
  }

  setGraphs() {
    const ctx = this.barChart.nativeElement;
    this.barGraph = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: this.data.right.label,
            data: this.data.right.data,
            backgroundColor: this.data.right.color,
          },
          {
            label: this.data.bad.label,
            data: this.data.bad.data,
            backgroundColor: this.data.bad.color,
          },
        ],
      },
      options: {
        responsive: true,
        onClick: (event) => {
          const points = this.barGraph.getElementsAtEventForMode(
            event,
            'nearest',
            { intersect: true },
            true
          );
          if (points[0]) {
            const label = this.barGraph.data.labels[points[0].index];
            const type = points[0].datasetIndex;
            this.outputData.emit({
              label,
              type,
            });
          }
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: this.data.title,
          },
        },
      },
    });
  }
}
