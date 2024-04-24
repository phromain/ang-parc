import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {ParcFilterService} from "../../services/parc-filter.service";

@Component({
  selector: 'app-type-banner',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './type-banner.component.html',
  styleUrl: './type-banner.component.css'
})
export class TypeBannerComponent {

  constructor(private parcFilterService: ParcFilterService) { }

  onBannerClick(typeParc: string) {
    switch (typeParc) {
      case 'attraction':
        this.parcFilterService.setAttraction(true);
        break;
      case 'aquatique':
        this.parcFilterService.setAquatique(true);
        break;
      case 'spectacle':
        this.parcFilterService.setSpectacle(true);
        break;
      case 'zoo':
        this.parcFilterService.setZoo(true);
        break;
    }
  }
}




