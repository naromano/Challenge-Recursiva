import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { Partner } from '../../../models/partner';
import { DataFileService } from '../../../services/dataFile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  partnersRegistred!: number;

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
        this.stepOne(data);
      } else {
        alert('Suba primero un archivo');
        this.router.navigateByUrl('/');
      }
    });
  }

  stepOne(parseCsvData: Partner[]) {
    this.partnersRegistred = this.stepsService.stepOne(parseCsvData);
  }
}
