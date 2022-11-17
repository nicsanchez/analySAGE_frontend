import { Component, Input, OnInit } from '@angular/core';
import { FileUploadComponent } from 'src/app/components/forms/file-upload/file-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { InscribedService } from 'src/app/services/inscribed-service.service';
import { QuestionsService } from 'src/app/services/questions-service.service';
import { AnswersService } from 'src/app/services/answers-service.service';

@Component({
  selector: 'app-bulk-card',
  templateUrl: './bulk-card.component.html',
  styleUrls: ['./bulk-card.component.css']
})
export class BulkCardComponent implements OnInit {

  @Input() data: any;
  constructor(private dialog: MatDialog,
    private inscribedService:InscribedService,
    private questionsService:QuestionsService,
    private answersService:AnswersService) { }

  ngOnInit(): void {
  }

  loadFile(){
    let uploadData = {};
    switch (this.data.type) {
      case 1:
        uploadData = {
          title:'Carga masiva de inscritos',
          callback:this.inscribedService.saveAttachments,
          service:this.inscribedService,
          confirmMessage:`Estas a punto de subir la información de inscritos`
        };
        break;
      case 2:
        uploadData = {
          title:'Carga masiva de ruta de respuestas',
          callback:this.questionsService.saveAttachments,
          service:this.questionsService,
          confirmMessage:`Estas a punto de subir la ruta de respuestas`
        };
        break;
      case 3:
        uploadData = {
          title:'Carga masiva de respuestas de aspirantes',
          callback:this.answersService.saveAttachments,
          service:this.answersService,
          confirmMessage:`Estas a punto de subir las respuestas de los aspirantes`
        };
        break;
      default:
        break;
    }
    this.uploadFile(uploadData);
  }

  uploadFile(uploadData:any) {
    this.dialog.open(FileUploadComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: uploadData.title,
        attachmentConditions: {
          accept: '.xlsx,.xls,application/vnd.ms-excel,'+
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          size: 2000,
        },
        callback: uploadData.callback,
        service: uploadData.service,
        confirm: {
          message: uploadData.confirmMessage
        },
        nextStep: 'Guardar',
      },
    });
  }

}
