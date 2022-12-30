import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-statistics',
  templateUrl: './dynamic-statistics.component.html',
  styleUrls: ['./dynamic-statistics.component.css'],
})
export class DynamicStatisticsComponent implements OnInit {
  public tabs: any = [{ active: false }, { active: false }];

  constructor() {}

  ngOnInit(): void {
    this.tabChange(0);
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
