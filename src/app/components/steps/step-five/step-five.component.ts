import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';
import { Partner } from '../../../models/partner';
import { TeamStatistics } from '../../../models/teamStatistics';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrl: './step-five.component.css',
})
export class StepFiveComponent implements OnInit {
  teamStatistics!: TeamStatistics[];

  constructor(
    private stepsService: StepsService,
    private dataFile: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataRecived();
  }

  dataRecived() {
    this.dataFile.csvData$.subscribe((data) => {
      if (data) {
        this.stepFive(data);
      } else {
        alert('Suba primero un archivo');
        this.router.navigateByUrl('/');
      }
    });
  }

  stepFive(parseCsvData: Partner[]) {
    this.teamStatistics = this.stepsService.stepFive(parseCsvData);
  }
}
