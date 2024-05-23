import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { FileService } from '../../../services/file.service';
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
    private dataFile: FileService,
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
  }
}
