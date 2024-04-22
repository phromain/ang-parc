import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcFilterService {
  private initialParcs = new BehaviorSubject<any[]>([]);
  private filteredParcs = new BehaviorSubject<any[]>([]);
  currentParcs = this.filteredParcs.asObservable();
  allParcs = this.initialParcs.asObservable();

  constructor() { }

  setInitialParcs(parcs: any[]) {
    this.initialParcs.next(parcs);
    this.updateParcs(parcs);
  }

  updateParcs(parcs: any[]) {
    this.filteredParcs.next(parcs);
  }

  resetParcs() {
    this.filteredParcs.next(this.initialParcs.value);
  }
}
