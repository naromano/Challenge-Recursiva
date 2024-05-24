import { Component, OnInit } from '@angular/core';
import { StepsService } from '../../../services/steps.service';
import { DataFileService } from '../../../services/dataFile.service';
import { Partner } from '../../../models/partner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent implements OnInit {
  partnersRacing!: any[];
  displayedPartnersRacing: any[] = [];
  currentPage = 1;
  itemsPerPage = 20;

  constructor(
    private stepsService: StepsService,
    private dataFile: DataFileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataReceived();
  }

  dataReceived() {
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
    this.updateDisplayedPartners();
  }

  updateDisplayedPartners() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.partnersRacing.length
    );
    this.displayedPartnersRacing = this.partnersRacing.slice(
      startIndex,
      endIndex
    );
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedPartners();
  }

  getTotalPages(): number {
    return Math.ceil(this.partnersRacing.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
