import { Component,OnInit } from '@angular/core'
import {MatCardModule} from '@angular/material/card';
import {DataService} from "../../services/data.service";
import {NgForOf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-list-cards-parc',
  standalone: true,
  imports: [MatCardModule, NgForOf,MatButtonModule, MatIconModule],
  templateUrl: './list-cards-parc.component.html',
  styleUrl: './list-cards-parc.component.css'
})
export class ListCardsParcComponent implements OnInit{
  parcs : any[] = [];


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getParcs().subscribe((data: any[]) => {
      console.log(data)
      this.parcs = data;
    });
  }
}
