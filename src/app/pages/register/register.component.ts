import {Component} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {MatInput} from "@angular/material/input";
import {AlertComponent} from "@coreui/angular";
import {FooterComponent} from "../../components/template/footer/footer.component";
import {HeaderComponent} from "../../components/template/header/header.component";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {MustMatch} from "../../validator/validators";
import {IRegister} from "../../models/auth.model";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatStep,
    MatStepper,
    MatInput,
    AlertComponent,
    FooterComponent,
    HeaderComponent,
    MatButton,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formRegister: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(6), Validators.maxLength(18)]],
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/)]],
    confPassword: ['', [Validators.required]]}, {
    validator: MustMatch('password', 'confPassword')
  });


  submitted  = false;
  errorMessage = '';
  errorUsernamePassword = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }


  onSubmit() {
    this.submitted = true;
    this.errorUsernamePassword = false;
    this.errorMessage = '';
    if (this.formRegister.invalid) {
      if (this.formRegister.get('username')?.errors?.['required']) {
        this.errorMessage += 'Le nom d\'utilisateur est requis. ';
      }
      if (this.formRegister.get('username')?.errors?.['pattern']) {
        this.errorMessage += 'Seules les lettres sont autorisées sans accents.';
      }
      if (this.formRegister.get('username')?.errors?.['minlength']) {
        this.errorMessage += 'Le nom d\'utilisateur doit comporter au moins 6 caractères. ';
      }
      if (this.formRegister.get('username')?.errors?.['maxlength']) {
        this.errorMessage += 'Le nom d\'utilisateur ne doit pas dépasser 18 caractères. ';
      }
      if (this.formRegister.get('email')?.errors?.['required']) {
        this.errorMessage += 'L email est requis. ';
      }
      if (this.formRegister.get('email')?.errors?.['pattern']) {
        this.errorMessage += 'Le format de l\'email est invalide. ';
      }
      if (this.formRegister.get('password')?.errors?.['required']) {
        this.errorMessage += 'Le mot de passe est requis. ';
      }
      if (this.formRegister.get('password')?.errors?.['minlength']) {
        this.errorMessage += 'Le mot de passe doit comporter au moins 8 caractères. ';
      }
      if (this.formRegister.get('password')?.errors?.['maxlength']) {
        this.errorMessage += 'Le mot de passe ne doit pas dépasser 25 caractères. ';
      }
      if (this.formRegister.get('password')?.errors?.['pattern']) {
        this.errorMessage += 'Il faut une majuscule, un chiffre, une lettre et un caractère spécial.';
      }
      if (this.formRegister.get('confPassword')?.errors?.['required']) {
        this.errorMessage += 'La confirmation du mot de passe est requis. ';
      }
      if (this.formRegister.get('confPassword')?.errors?.['mustMatch']) {
        this.errorMessage += 'Le Password et la confirmation du mot du password doit etre identique. ';
      }
    } else {
      const registerData: IRegister = {
        pseudo: this.formRegister.value.username,
        email: this.formRegister.value.email,
        mdp: this.formRegister.value.password
      };
      // @ts-ignore
      this.authService.onRegister(registerData).subscribe({
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
      title: "Inscription réussie, merci de valider votre inscription sur votre adresse mail : " + this.formRegister.get('email')?.value,
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
