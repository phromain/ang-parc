import { Component } from '@angular/core';
import {AlertComponent} from "@coreui/angular";
import {FooterComponent} from "../../components/template/footer/footer.component";
import {HeaderComponent} from "../../components/template/header/header.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AlertComponent,
    FooterComponent,
    HeaderComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  formUsername: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(6), Validators.maxLength(18)]],
  });
  submitted = false;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.formUsername.invalid) {
      if (this.formUsername.get('username')?.errors?.['required']) {
        this.errorMessage += 'Le nom d\'utilisateur est requis. ';
      }
      if (this.formUsername.get('username')?.errors?.['pattern']) {
        this.errorMessage += 'Seules les lettres sont autorisées sans accents.';
      }
      if (this.formUsername.get('username')?.errors?.['minlength']) {
        this.errorMessage += 'Le nom d\'utilisateur doit comporter au moins 6 caractères. ';
      }
      if (this.formUsername.get('username')?.errors?.['maxlength']) {
        this.errorMessage += 'Le nom d\'utilisateur ne doit pas dépasser 18 caractères. ';
      }
    } else {
      // @ts-ignore
      this.authService.onForgotPassword(this.formUsername.get('username').value).subscribe({
        next: response => {
            this.sweetAlertMessage();

        },
        error: err => {
          this.sweetAlertMessageError(err.error);
        }
      });
    }
  }

  sweetAlertMessage()
  {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Si votre pseudo est enregistré, vous recevrez un lien de réinitialisation de mot de passe.",
      showConfirmButton: false,
      timer: 3200
    });
    this.router.navigate(['connexion'])
  }


  sweetAlertMessageError( error : string)
  {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Vous rencontrez une erreur pour la raison : " + error,
      showConfirmButton: false,
      timer: 3200
    });
  }
}
