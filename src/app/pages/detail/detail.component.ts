import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../components/template/footer/footer.component";
import {HeaderComponent} from "../../components/template/header/header.component";
import {ListCardsParcComponent} from "../../components/list-cards-parc/list-cards-parc.component";
import {SideBarResearchComponent} from "../../components/side-bar-research/side-bar-research.component";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ListCardsParcComponent,
    SideBarResearchComponent,
    NgIf,
    TitleCasePipe,
    NgForOf,
    MatButton,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  parc: any;
  reseauxSociaux: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const slugParc = params['parc'];
      if (slugParc) {
        this.dataService.getDetailParc(slugParc).subscribe({
          next: (data: any) => {
            if (data) {
              this.parc = data;
              this.dataService.getReseauxSociauxParc(data.id).subscribe({
                next: (data: any) => {
                  this.reseauxSociaux = data;
                }
              });
            } else {
              this.router.navigate(['**']);
            }
          },
          error: (error: any) => {
            this.router.navigate(['**']);
          }
        });
      } else {
        this.router.navigate(['**']);
      }
    });
  }
}
