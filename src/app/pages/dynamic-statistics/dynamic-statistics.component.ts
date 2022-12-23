import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dynamic-statistics',
  templateUrl: './dynamic-statistics.component.html',
  styleUrls: ['./dynamic-statistics.component.css'],
})
export class DynamicStatisticsComponent implements AfterViewInit {
  public searchForm: FormGroup;
  public firstOptionProgramOptions: any;
  public firstOptionProgramFilter: FormControl = new FormControl();
  public filteredFirstOptionProgram: ReplaySubject<any[]> = new ReplaySubject<
    any[]
  >(1);
  protected _firstOptionProgramDestroy = new Subject<void>();
  @ViewChild('rightAnswersBySession') private rightAnswersBySession: ElementRef;
  public barErrorGraphChart: any;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      firstOptionProgram: [''],
    });
  }

  ngAfterViewInit(): void {
    this.fullfillForm();
    this.preparePredictiveSearch();
    this.setGraphs();
  }
  setGraphs() {
    const ctx = this.rightAnswersBySession.nativeElement;
    const errorData = {
      label: 'Cantidad de aciertos por jornada para pregunta 40',
      data: [10000, 21400, 8500, 4459, 5544, 6111, 7787],
    };

    this.barErrorGraphChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [errorData],
      },
    });
  }
  fullfillForm() {
    let exampleVariable = [
      { id: 1, name: 'Ingenieria electrónica' },
      { id: 2, name: 'Ingenieria mecánica' },
      { id: 4, name: 'Ingenieria civil' },
      { id: 5, name: 'Ingenieria matematica' },
      { id: 6, name: 'Ingenieria ambiental' },
    ];
    this.firstOptionProgramOptions = exampleVariable;
    this.filteredFirstOptionProgram.next(exampleVariable);
  }

  preparePredictiveSearch() {
    this.firstOptionProgramFilter.valueChanges
      .pipe(takeUntil(this._firstOptionProgramDestroy))
      .subscribe(() => {
        this.filterFirstOptionProgram();
      });
  }

  filterFirstOptionProgram() {
    if (!this.firstOptionProgramOptions) {
      return;
    }

    let search = this.firstOptionProgramFilter.value;

    if (!search) {
      this.filteredFirstOptionProgram.next(
        this.firstOptionProgramOptions.slice()
      );
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredFirstOptionProgram.next(
      this.firstOptionProgramOptions.filter(
        (option: any) => option.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
