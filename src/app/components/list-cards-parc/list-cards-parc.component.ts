import { Component,OnInit } from '@angular/core'
import {MatCardModule} from '@angular/material/card';
import {DataService} from "../../services/data.service";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ParcFilterService} from "../../services/parc-filter.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-cards-parc',
  standalone: true,
  imports: [MatCardModule, NgForOf, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list-cards-parc.component.html',
  styleUrl: './list-cards-parc.component.css'
})
export class ListCardsParcComponent implements OnInit {
    parcs: any[] = [];


    constructor(private parcFilterService: ParcFilterService, private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getParcs().subscribe((parcs: any[]) => {
            this.parcFilterService.setInitialParcs(parcs);
            this.parcFilterService.currentParcs.subscribe(currentParcs => {
                console.log('currentParcs', currentParcs);
                this.parcs = currentParcs;
            });
        });
    }




}
