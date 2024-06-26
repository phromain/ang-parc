import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FooterComponent} from "../../components/template/footer/footer.component";
import {HeaderComponent} from "../../components/template/header/header.component";
import {ListCardsParcComponent} from "../../components/list-cards-parc/list-cards-parc.component";
import {SideBarResearchComponent} from "../../components/side-bar-research/side-bar-research.component";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {KeyValuePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-detail',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [provideNativeDateAdapter(),{ provide: MAT_DATE_LOCALE, useValue: 'fr' }],
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
    MatButtonModule,
    KeyValuePipe,
    MatCardModule, MatDatepickerModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  parc: any;
  periods: {start: Date, end: Date}[] = [];

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
              this.periods = this.adjustPeriods(this.parc.periodeOuverture);

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

  adjustPeriods(periodeOuverture: string[]) {
    return periodeOuverture.map((periode: string) => {
      const [start, end] = periode.split(' - ');
      let startDate = new Date(start);
      startDate.setDate(startDate.getDate() - 1);
      if (startDate.getDate() === 31 && [4, 6, 9, 11].includes(startDate.getMonth())) {
        startDate.setDate(30);
      } else if (startDate.getMonth() === 2) {
        startDate.setDate(startDate.getFullYear() % 4 === 0 ? 29 : 28);
      }
      return {start: startDate, end: new Date(end)};
    });
  }

  dateClass = (d: Date) => {
    const dateMatch = this.periods.find(period =>
      d >= period.start && d <= period.end
    );
    return dateMatch ? 'special-date' : '';
  };

}
