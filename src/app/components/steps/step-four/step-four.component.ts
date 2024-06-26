import { Component } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { DataFileService } from '../../../services/dataFile.service';
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
    private dataFile: DataFileService,
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
    if (this.partnersRiver.length === 0) {
      alert('No hay socios de River');
      this.router.navigateByUrl('/');
    }
  }
}
