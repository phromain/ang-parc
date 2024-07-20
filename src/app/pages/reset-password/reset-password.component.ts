import { Component } from '@angular/core';
import {AlertComponent} from "@coreui/angular";
import {FooterComponent} from "../../components/template/footer/footer.component";
import {HeaderComponent} from "../../components/template/header/header.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MustMatch} from "../../validator/validators";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  formResetPassword: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/)]],
    confPassword: ['', [Validators.required]]}, {
    validator: MustMatch('password', 'confPassword')
  });

  submitted  = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }


  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.formResetPassword.invalid) {
      if (this.formResetPassword.get('password')?.errors?.['required']) {
        this.errorMessage += 'Le mot de passe est requis. ';
      }
      if (this.formResetPassword.get('password')?.errors?.['minlength']) {
        this.errorMessage += 'Le mot de passe doit comporter au moins 8 caractères. ';
      }
      if (this.formResetPassword.get('password')?.errors?.['maxlength']) {
        this.errorMessage += 'Le mot de passe ne doit pas dépasser 25 caractères. ';
      }
      if (this.formResetPassword.get('password')?.errors?.['pattern']) {
        this.errorMessage += 'Il faut une majuscule, un chiffre, une lettre et un caractère spécial.';
      }
      if (this.formResetPassword.get('confPassword')?.errors?.['required']) {
        this.errorMessage += 'La confirmation du mot de passe est requis. ';
      }
      if (this.formResetPassword.get('confPassword')?.errors?.['mustMatch']) {
        this.errorMessage += 'Le Password et la confirmation du mot du password doit etre identique. ';
      }
    } else {
      this.sweetAlertMessage();
    }
  }

  sweetAlertMessage()
  {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Mot de passe réinitialisé",
      showConfirmButton: false,
      timer: 3200
    });
    this.router.navigate(['connexion'])
  }



}
