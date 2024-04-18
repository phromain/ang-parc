import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";

export const routes: Routes = [

  {path:'',component: HomeComponent},
  {path: 'connexion', component: SignInComponent },





  {path: '**', component: NotFoundComponent}
];


