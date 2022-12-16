import { Component, Input, OnInit } from '@angular/core';
import { FileUploadComponent } from 'src/app/components/forms/file-upload/file-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-card',
  templateUrl: './bulk-card.component.html',
  styleUrls: ['./bulk-card.component.css'],
})
export class BulkCardComponent implements OnInit {
  public card: any = {};
  @Input() data: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.card = this.data.card;
  }

  loadFile() {
    this.dialog.open(FileUploadComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: this.card.title,
        attachmentConditions: {
          accept:
            '.xlsx,.xls,application/vnd.ms-excel,' +
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          size: 2000,
        },
        callback: this.card.callback,
        service: this.card.service,
        confirm: {
          message: this.card.confirmMessage,
        },
        showSemester: this.card.showSemester,
        nextStep: 'Guardar',
      },
    });
  }
}
