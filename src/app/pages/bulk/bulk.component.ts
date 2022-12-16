import { Component } from '@angular/core';
import { AnswersService } from 'src/app/services/answers-service.service';
import { InscribedService } from 'src/app/services/inscribed-service.service';
import { QuestionsService } from 'src/app/services/questions-service.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css'],
})
export class BulkComponent {
  constructor(
    private inscribedService: InscribedService,
    private questionsService: QuestionsService,
    private answersService: AnswersService
  ) {}

  public inscribedData = {
    card: {
      title: 'Carga masiva de inscritos',
      callback: this.inscribedService.saveAttachments,
      service: this.inscribedService,
      confirmMessage: `Estas a punto de subir la información de inscritos`,
      showSemester: true,
    },
    title: 'Inscritos por semestre',
    description:
      'El objetivo principal de este cargue masivo es ' +
      'ingresar al aplicativo la información personal y la información ' +
      'respectiva a la presentación del examen de admisión de los aspirantes a un semestre.',
  };
  public questionsData = {
    card: {
      title: 'Carga masiva de ruta de respuestas',
      callback: this.questionsService.saveAttachments,
      service: this.questionsService,
      confirmMessage: `Estas a punto de subir la ruta de respuestas`,
      showSemester: true,
    },
    title: 'Ruta de respuestas',
    description:
      'El objetivo principal de este cargue masivo es ' +
      'ingresar al aplicativo las respuestas correctas de la versión 1 del ' +
      'examen para las diferentes jornadas de un semestre.',
  };
  public answersData = {
    card: {
      title: 'Carga masiva de respuestas de aspirantes',
      callback: this.answersService.saveAttachments,
      service: this.answersService,
      confirmMessage: `Estas a punto de subir las respuestas de los aspirantes`,
      showSemester: true,
    },
    title: 'Respuestas de aspirantes',
    description:
      'El objetivo principal de este cargue masivo es ' +
      'ingresar al aplicativo las respuestas marcadas por cada uno ' +
      'de los aspirantes de un semestre.',
  };
}
