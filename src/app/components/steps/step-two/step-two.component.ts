import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { DataFileService } from '../../../services/dataFile.service';
import { Partner } from '../../../models/partner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent implements OnInit {
  averageAge!: string;
  constructor(
    private stepsService: StepsService,
    private dataFile: DataFileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataRecived();
  }

  dataRecived() {
    this.dataFile.csvData$.subscribe((data) => {
      if (data) {
        this.stepTwo(data);
      } else {
        alert('Suba primero un archivo');
        this.router.navigateByUrl('/');
      }
    });
  }

  stepTwo(parseCsvData: Partner[]) {
    this.averageAge = this.stepsService.stepTwo(parseCsvData);
    if (this.averageAge === 'NaN') {
      alert('No hay socios de Racing');
      this.router.navigateByUrl('/');
    }
    if (this.averageAge === '0.00') {
      alert('Los socios de Racing no tienen edad mayor a 0');
      this.router.navigateByUrl('/');
    }
  }
}
