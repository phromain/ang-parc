import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {ForgotUsernameComponent} from "./pages/forgot-username/forgot-username.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {PinComponent} from "./pages/pin/pin.component";
import {ResearchComponent} from "./pages/research/research.component";
import {DetailComponent} from "./pages/detail/detail.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./guard/auth.guard";

export const routes: Routes = [

  {path:'',component: HomeComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'connexion', component: SignInComponent },
  {path: 'connexion/login-perdu', component: ForgotUsernameComponent},
  {path: 'connexion/password-perdu', component: ForgotPasswordComponent },
  {path: 'connexion/password-perdu/reset-password', component: ResetPasswordComponent },
  {path: 'connexion/pin', component: PinComponent },
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  {path: 'recherche', component: ResearchComponent },
  {path: 'recherche/detail', component: DetailComponent},









  {path: '**', component: NotFoundComponent}
];


