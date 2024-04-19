import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitleGroup,
    MatCard
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {

}
