import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AlertComponent, FormDirective,} from "@coreui/angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../components/template/header/header.component";
import {FooterComponent} from "../../components/template/footer/footer.component";
import Swal from "sweetalert2";
import {JwtService} from "../../services/jwt.service";
@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [MatCardModule, FormDirective, ReactiveFormsModule, MatButton, RouterLink, AlertComponent, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.css'
})
export class PinComponent {
  formPin: FormGroup = this.formBuilder.group({
    number1: ['', [Validators.required, Validators.pattern('[0-9]')]],
    number2: ['', [Validators.required, Validators.pattern('[0-9]')]],
    number3: ['', [Validators.required, Validators.pattern('[0-9]')]],
    number4: ['', [Validators.required, Validators.pattern('[0-9]')]],
  })

  codePin: string;
  submitted  = false;
  errorMessage = '';
  errorPin = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private jwtService: JwtService) {
  this.codePin = "";
  }

  onSubmit() {
    this.submitted = true;
    this.errorPin = false;
    this.errorMessage = '';
    let emptyFieldError = false;
    let patternError = false;

    for (let i = 1; i <= 4; i++) {
      if (this.formPin.get('number' + i)?.errors?.['required']) {
        emptyFieldError = true;
      }
      if (this.formPin.get('number' + i)?.errors?.['pattern'] || !this.isNumber(this.formPin.get('number' + i)?.value)) {
        patternError = true;
      }
    }
    if (emptyFieldError) {
      this.errorMessage += 'Un des champs est vide au minimun. ';
    }
    if (patternError) {
      this.errorMessage += 'Merci de saisir un chiffre entre 0 et 9.';
    }
    if (!emptyFieldError && !patternError) {
      console.log("enter");
      this.codePin = this.formPin.value.number1.toString() + this.formPin.value.number2.toString() + this.formPin.value.number3.toString() + this.formPin.value.number4.toString();
      this.authService.onConfirmPin(this.authService.username,this.authService.password,this.codePin).subscribe({
        next: response => {
          // @ts-ignore
          const jwt = response.split("Code PIN correct, JWT généré ")[1];
          console.log(jwt)
          if (jwt) {
            this.jwtService.setJwt(jwt);
            this.authService.login();
            this.router.navigate(['dashboard']);
          }
        },
        error: err => {
          this.sweetAlertMessage();
        }
      });
    }
  }

  isNumber(value: string): boolean {
    const pattern = /^[0-9]*$/;
    return pattern.test(value);
  }

  moveFocus(event: KeyboardEvent, nextElementId: string) {
    if ((event.target as HTMLInputElement).value.length === 1) {
      document.getElementById(nextElementId)?.focus();
    }
  }

  sweetAlertMessage()
  {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Code PIN erroné",
      showConfirmButton: false,
      timer: 3200
    });
  }


}
