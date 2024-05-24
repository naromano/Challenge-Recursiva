import { Component } from '@angular/core';
import { DataFileService } from '../../services/dataFile.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent {
  csvData: any[] = [];
  parseCsvData: any[] = [];
  dataExist = false;

  constructor(private dataFile: DataFileService) {
    this.dataFile.dataFile.subscribe((data) => {
      this.dataExist = true;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.dataFile.handleFileSelect(file);
    }
  }
}
