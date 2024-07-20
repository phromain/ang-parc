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
import {Router} from "@angular/router";
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
        ReactiveFormsModule
    ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  formUsername: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
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
        this.errorMessage += 'L\'Username est requis. ';
      }
      if (this.formUsername.get('username')?.errors?.['username']) {
        this.errorMessage += 'Seules les lettres sont autorisées sans accents';
      }
    } else {

    }
  }

  sweetAlertMessage()
  {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Si votre pseudo est enregistré, vous recevrez un lien de réinitialisation de mot de passe.",
      showConfirmButton: false,
      timer: 2500
    });
    this.router.navigate(['connexion'])
  }

}
