import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
