import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private csvDataSubject = new BehaviorSubject<any>(null);

  csvData$ = this.csvDataSubject.asObservable();

  emitCsvData(data: any) {
    this.csvDataSubject.next(data);
  }
}
