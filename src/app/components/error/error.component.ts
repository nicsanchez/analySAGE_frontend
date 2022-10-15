import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {
  public errors: any[] = [];
  public headers: any[] = [];
  public description: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.errors = this.data.errors;
    this.description = this.data.description;
    this.headers = this.data.headers;
  }
}
