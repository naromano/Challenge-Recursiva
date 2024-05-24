import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { FileService } from '../../../services/file.service';
import { Partner } from '../../../models/partner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent implements OnInit {
  partnersRacing!: any[];
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
        this.stepThree(data);
      } else {
        alert('Suba primero un archivo');
        this.router.navigateByUrl('/');
      }
    });
  }

  stepThree(parseCsvData: Partner[]) {
    this.partnersRacing = this.stepsService.stepThree(parseCsvData);
    if (this.partnersRacing.length === 0) {
      alert('No hay socios casados o con estudios universitarios');
      this.router.navigateByUrl('/');
    }
  }
}
