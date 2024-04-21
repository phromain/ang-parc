import { Component,OnInit  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DataService} from "../../services/data.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-type',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, NgForOf,],
  templateUrl: './list-type.component.html',
  styleUrl: './list-type.component.css'
})
export class ListTypeComponent implements OnInit{
  types : any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTypes().subscribe((data: any[]) => {
      this.types = data;
    });
  }
}
