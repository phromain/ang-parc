import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {SearchBannerComponent} from "../../components/search-banner/search-banner.component";
import {MapComponent} from "../../components/map/map.component";
import {TypeBannerComponent} from "../../components/type-banner/type-banner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SearchBannerComponent,
    MapComponent,
    TypeBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
