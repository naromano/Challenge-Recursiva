import { Component } from '@angular/core';
import { DataFileService } from '../../services/dataFile.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent {
  file!: File;
  csvData: any[] = [];
  parseCsvData: any[] = [];
  dataExist = false;

  constructor(private dataFile: DataFileService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  sendFile(file: File) {
    if (file) {
      this.dataFile.handleFileSelect(file);
      alert('Archivo cargado, elija el ejercicio que quiera realizar');
    }
  }
}
