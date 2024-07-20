import {Component} from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,FormBuilder
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AlertComponent,} from "@coreui/angular";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";



@Component({
  selector: 'app-forgot-username',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, AlertComponent, NgIf, HeaderComponent, FooterComponent],
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
      if (this.formEmail.get('email')?.errors?.['email']) {
        this.errorMessage += 'Le format de l\'email est invalide. ';
      }
    } else {

    }
  }

    sweetAlertMessage()
    {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Si votre e-mail : " + this.formEmail.value.email + " est enregistré, vous recevrez bientôt votre username.",
        showConfirmButton: false,
        timer: 2500
      });
      this.router.navigate(['connexion'])
    }


}

