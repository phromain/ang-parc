import { Component } from '@angular/core';
import {ParcFilterService} from "../../services/parc-filter.service";
import {Router } from "@angular/router";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  constructor(private parcFilterService: ParcFilterService, private router: Router) { }

  onMapClick(region: number) {
    this.parcFilterService.setRegionId(region);
    this.router.navigate(['/recherche'])
  }
}
