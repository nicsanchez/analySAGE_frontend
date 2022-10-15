import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { LogsService } from 'src/app/services/logs.service';
import { requestDataAndPaginateIt } from 'src/utils/paginate.utils';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['modulo', 'accion', 'usuario', 'created_at'];
  dataSource = [];
  itemsPerPage = 5;
  page = 0;
  total = 0;
  public loading: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private logsService: LogsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    let data = {
      token: localStorage.getItem('token'),
      itemsPerPage: this.itemsPerPage,
    };
    this.loading = true;
    requestDataAndPaginateIt(
      data,
      this.page,
      this,
      this.logsService.getLogs,
      this.logsService,
      this.toastrService
    );
  }

  changePage(event: any) {
    this.page = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getLogs();
  }
}
