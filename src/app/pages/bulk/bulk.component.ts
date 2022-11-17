import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class BulkComponent implements OnInit {

  public inscribedData = {
    type:1,
    title:'Inscritos por semestre',
    description:'El objetivo principal de este cargue masivo es ' +
    'ingresar al aplicativo la información personal y la información ' +
    'respectiva a la presentación del examen de admisión de los aspirantes a un semestre.'
  };
  public questionsData = {
    type:2,
    title:'Ruta de respuestas',
    description:'El objetivo principal de este cargue masivo es ' +
    'ingresar al aplicativo las respuestas correctas de la versión 1 del ' +
    'examen para las diferentes jornadas de un semestre.'
  };
  public answersData = {
    type:3,
    title:'Respuestas de aspirantes',
    description:'El objetivo principal de este cargue masivo es ' +
    'ingresar al aplicativo las respuestas marcadas por cada uno ' +
    'de los aspirantes de un semestre.'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
