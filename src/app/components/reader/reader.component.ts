import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent {
  csvData: any[] = [];
  parseCsvData: any[] = [];
  dataExist = false;

  constructor(private dataFile: FileService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.name.toLowerCase().endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csv = reader.result as string;
          Papa.parse(csv, {
            header: false,
            delimiter: '\n',
            complete: (result) => {
              this.csvData = result.data;
              this.parseCsvData = this.csvData
                .map((item) => item[0])
                .filter((line) => line)
                .map((line) => {
                  const [name, age, team, civilStatus, levelStudy] =
                    line.split(';');
                  return {
                    name: name.toLowerCase(),
                    age: Number(age),
                    team: team.toLowerCase(),
                    civilStatus: civilStatus.toLowerCase(),
                    levelStudy: levelStudy.toLowerCase(),
                  };
                });

              this.dataFile.emitCsvData(this.parseCsvData);
              this.dataExist = true;
            },
          });
        };
        reader.readAsText(file);
      } else {
        alert('Por favor ingrese un archivo CSV.');
        event.target.value = null;
      }
    }
  }
}
