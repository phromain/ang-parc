import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import {AlertComponent} from "@coreui/angular";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
    imports: [
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        AlertComponent,
        NgIf,
        RouterLink,
        HeaderComponent,
        FooterComponent
    ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(6), Validators.maxLength(18)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/)]],
  })

  submitted  = false;
  errorMessage = '';
  errorUsernamePassword = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }


  onSubmit() {
    this.submitted = true;
    this.errorUsernamePassword = false;
    this.errorMessage = '';
    if (this.form.invalid) {
      if (this.form.get('username')?.errors?.['required']) {
        this.errorMessage += 'Le nom d\'utilisateur est requis. ';
      }
      if (this.form.get('username')?.errors?.['pattern']) {
         this.errorMessage += 'Seules les lettres sont autorisées sans accents.';
      }
      if (this.form.get('username')?.errors?.['minlength']) {
        this.errorMessage += 'Le nom d\'utilisateur doit comporter au moins 6 caractères. ';
      }
      if (this.form.get('username')?.errors?.['maxlength']) {
        this.errorMessage += 'Le nom d\'utilisateur ne doit pas dépasser 18 caractères. ';
      }
      if (this.form.get('password')?.errors?.['required']) {
        this.errorMessage += 'Le mot de passe est requis. ';
      }
      if (this.form.get('password')?.errors?.['minlength']) {
        this.errorMessage += 'Le mot de passe doit comporter au moins 8 caractères. ';
      }
      if (this.form.get('password')?.errors?.['maxlength']) {
        this.errorMessage += 'Le mot de passe ne doit pas dépasser 25 caractères. ';
      }
      if (this.form.get('password')?.errors?.['pattern']) {
      this.errorMessage += 'Il faut une majuscule, un chiffre, une lettre et un caractère spécial.';
      }
      else {
    } }
  }
}
