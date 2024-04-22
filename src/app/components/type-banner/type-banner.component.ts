import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

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

}
