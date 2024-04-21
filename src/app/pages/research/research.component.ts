import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";
import {SideBarResearchComponent} from "../../components/side-bar-research/side-bar-research.component";
import {ListCardsParcComponent} from "../../components/list-cards-parc/list-cards-parc.component";
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
    MatCard,
    SideBarResearchComponent,
    ListCardsParcComponent
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {

}
