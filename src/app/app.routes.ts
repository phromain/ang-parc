import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {ForgotUsernameComponent} from "./pages/forgot-username/forgot-username.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PinComponent} from "./pages/pin/pin.component";
import {SideBarResearchComponent} from "./components/side-bar-research/side-bar-research.component";

export const routes: Routes = [

  {path:'',component: HomeComponent},
  {path: 'connexion', component: SignInComponent },
  {path: 'connexion/login-perdu', component: ForgotUsernameComponent},
  {path: 'connexion/password-perdu', component: ForgotPasswordComponent },
  {path: 'connexion/pin', component: PinComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'side', component: SideBarResearchComponent },










  {path: '**', component: NotFoundComponent}
];


