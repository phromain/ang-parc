import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class ParcFilterService {
  private initialParcs = new BehaviorSubject<any[]>([]);
  private filteredParcs = new BehaviorSubject<any[]>([]);
  currentParcs = this.filteredParcs.asObservable();
  allParcs = this.initialParcs.asObservable();
  nomParc: string = '';
  regionId: number = 0;
  attraction: boolean = false;
  aquatique: boolean = false;
  spectacle: boolean = false;
  zoo: boolean = false;
  parkingGratuit: boolean = false;
  restauration: boolean = false;
  boutique: boolean = false;
  sejour: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.parcs$.subscribe(parcs => {
      this.setInitialParcs(parcs);
    });
  }

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

  setNomParc(value: string) {
    this.nomParc = value;
    this.updateFilteredParcs();
  }

  setRegionId(value: number) {
    this.regionId = value;
    this.updateFilteredParcs();
  }

  setAttraction(value: boolean) {
    this.attraction = value;
    this.updateFilteredParcs();
  }

  setAquatique(value: boolean) {
    this.aquatique = value;
    this.updateFilteredParcs();
  }

  setSpectacle(value: boolean) {
    this.spectacle = value;
    this.updateFilteredParcs();
  }

  setZoo(value: boolean) {
    this.zoo = value;
    this.updateFilteredParcs();
  }

  setParkingGratuit(value: boolean) {
    this.parkingGratuit = value;
    this.updateFilteredParcs();
  }

  setRestauration(value: boolean) {
    this.restauration = value;
    this.updateFilteredParcs();
  }

  setBoutique(value: boolean) {
    this.boutique = value;
    this.updateFilteredParcs();
  }

  setSejour(value: boolean) {
    this.sejour = value;
    this.updateFilteredParcs();
  }

  updateFilteredParcs() {
    console.log("enter");
    console.log(this.initialParcs);
    const filteredParcs = this.initialParcs.value.filter(parc => {
      return (this.nomParc ? parc.nomParc.toLowerCase().includes(this.nomParc.toLowerCase()) : true) &&
          (this.regionId ? parc.idRegion === this.regionId : true) &&
          (!this.attraction && !this.aquatique && !this.spectacle && !this.zoo ? true :
              (this.attraction && parc.libelleTypeParc === 'Attraction') ||
              (this.aquatique && parc.libelleTypeParc === 'Aquatique') ||
              (this.spectacle && parc.libelleTypeParc === 'Spectacle') ||
              (this.zoo && parc.libelleTypeParc === 'Zoo')) &&
          (this.parkingGratuit ? parc.parkingGratuit === this.parkingGratuit : true) &&
          (this.restauration ? parc.restauration === this.restauration : true) &&
          (this.boutique ? parc.boutique === this.boutique : true) &&
          (this.sejour ? parc.sejour === this.sejour : true);
    });
    this.updateParcs(filteredParcs);
  }

}
