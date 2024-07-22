import {Component} from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,FormBuilder
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import Swal from 'sweetalert2';
import {AlertComponent,} from "@coreui/angular";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";




@Component({
  selector: 'app-forgot-username',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, AlertComponent, NgIf, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './forgot-username.component.html',
  styleUrl: './forgot-username.component.css'
})
export class ForgotUsernameComponent {
  formEmail: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  });
  submitted = false;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.formEmail.invalid) {
      if (this.formEmail.get('email')?.errors?.['required']) {
        this.errorMessage += 'L email est requis. ';
      }
      if (this.formEmail.get('email')?.errors?.['pattern']) {
        this.errorMessage += 'Le format de l\'email est invalide. ';
      }
    } else {
        // @ts-ignore
        this.authService.onForgotUsername(this.formEmail.value).subscribe({
          next: response => {
            console.log("response " + response)
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
        title: "Si votre e-mail est enregistré, vous recevrez bientôt votre nom d'utilisateur.",
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

