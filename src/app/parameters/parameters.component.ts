import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.less']
})
export class ParametersComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ParametersComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  formatLabel(value: number): string {
    return `${value}s`;
  }
}
