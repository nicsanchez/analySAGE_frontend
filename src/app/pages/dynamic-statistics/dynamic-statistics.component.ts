import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dynamic-statistics',
  templateUrl: './dynamic-statistics.component.html',
  styleUrls: ['./dynamic-statistics.component.css'],
})
export class DynamicStatisticsComponent implements OnInit {
  public searchForm: FormGroup;
  public firstOptionProgramOptions: any;
  public firstOptionProgramFilter: FormControl = new FormControl();
  public filteredFirstOptionProgram: ReplaySubject<any[]> = new ReplaySubject<
    any[]
  >(1);
  protected _firstOptionProgramDestroy = new Subject<void>();

  public tabs: any = [{ active: false }, { active: false }];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      firstOptionProgram: [''],
    });
  }

  ngOnInit(): void {
    this.fullfillForm();
    this.preparePredictiveSearch();
    this.tabChange(0);
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

  tabChange(tabIndex: number) {
    for (let index = 0; index < this.tabs.length; index++) {
      if (tabIndex == index) {
        this.tabs[index] = { active: true };
      } else {
        this.tabs[index] = { active: false };
      }
    }
  }
}
