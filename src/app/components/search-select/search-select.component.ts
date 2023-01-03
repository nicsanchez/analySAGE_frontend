import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
})
export class SearchSelectComponent implements OnChanges {
  public selectOptions: any;
  public selectFilter: FormControl = new FormControl();
  public filteredSelect: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _selectDestroy = new Subject<void>();

  @Input() selectData: any;
  @Output() filteredData: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges() {
    if (this.selectData) {
      this.fullfillForm(this.selectData);
      this.preparePredictiveSearch();
    }
  }

  fullfillForm(faculties: any) {
    this.selectOptions = faculties;
    this.filteredSelect.next(faculties);
    this.filteredData.emit({
      data: this.filteredSelect,
    });
  }

  preparePredictiveSearch() {
    this.selectFilter.valueChanges
      .pipe(takeUntil(this._selectDestroy))
      .subscribe(() => {
        this.filterSelect();
      });
  }

  filterSelect() {
    if (this.selectOptions) {
      let search = this.selectFilter.value;
      if (!search) {
        this.filteredSelect.next(this.selectOptions.slice());
      } else {
        search = search.toLowerCase();
        this.filteredSelect.next(
          this.selectOptions.filter(
            (option: any) => option.name.toLowerCase().indexOf(search) > -1
          )
        );
      }
      this.filteredData.emit({
        data: this.filteredSelect,
      });
    }
  }
}
