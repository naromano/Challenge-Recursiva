import { EventEmitter, Injectable } from '@angular/core';
import Papa from 'papaparse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFileService {
  private csvDataBeSu = new BehaviorSubject<any>(null);
  public csvData: any[] = [];
  public parseCsvData: any[] = [];

  public dataFile = new EventEmitter<any[]>();
  csvData$ = this.csvDataBeSu.asObservable();

  constructor() {}

  handleFileSelect(file: File) {
    if (file.name.toLowerCase().endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = reader.result as string;
        this.parseCsv(csv);
      };
      reader.readAsText(file);
    } else {
      alert('Por favor ingrese un archivo CSV.');
    }
  }

  parseCsv(csv: string) {
    Papa.parse(csv, {
      header: false,
      delimiter: '\n',
      complete: (result) => {
        this.csvData = result.data;
        this.parseCsvData = this.csvData
          .map((item) => item[0])
          .filter((line) => line)
          .map((line) => {
            const [name, age, team, civilStatus, levelStudy] = line.split(';');
            return {
              name: name.toLowerCase(),
              age: Number(age),
              team: team.toLowerCase(),
              civilStatus: civilStatus.toLowerCase(),
              levelStudy: levelStudy.toLowerCase(),
            };
          });
        this.emitCsvData(this.parseCsvData);
      },
    });
  }

  emitCsvData(data: any) {
    this.csvDataBeSu.next(data);
  }
}
