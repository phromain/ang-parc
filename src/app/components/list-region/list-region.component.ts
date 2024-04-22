import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DataService} from "../../services/data.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-region',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, NgForOf, ReactiveFormsModule,],
  templateUrl: './list-region.component.html',
  styleUrl: './list-region.component.css'
})
export class ListRegionComponent implements OnInit{
  @Input() formRegion!: FormGroup;
  regions : any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRegions().subscribe((data: any[]) => {
      this.regions = data.sort((a, b) => a.nomRegion.localeCompare(b.nomRegion));
    });
  }
}
