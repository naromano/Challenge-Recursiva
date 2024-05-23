import { Component } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { FileService } from '../../../services/file.service';
import { Partner } from '../../../models/partner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css',
})
export class StepFourComponent {
  partnersRiver!: string[];
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
        this.stepFour(data);
      } else {
        alert('Suba primero un archivo');
        this.router.navigateByUrl('/');
      }
    });
  }

  stepFour(parseCsvData: Partner[]) {
    this.partnersRiver = this.stepsService.stepFour(parseCsvData);
  }
}
