import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-side-bar-research',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule,ReactiveFormsModule],
  templateUrl: './side-bar-research.component.html',
  styleUrl: './side-bar-research.component.css'
})
export class SideBarResearchComponent {
  typeParc = this.formBuilder.group({
    attraction: false,
    aquatique: false,
    spectacle: false,
    zoo: false,

  });

  constructor(private formBuilder: FormBuilder) {}

}
