import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { KlienciResolverService } from './klienci-resolver.service';
import { AuthGuard } from './owner-login/auth-guard';
import { OwnerLoginComponent } from './owner-login/owner-login.component';
import { OwnerComponent } from './owner/owner.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, resolve: [KlienciResolverService] },
  { path: 'contact', component: ContactComponent },
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'owner', canActivate: [AuthGuard],  component: OwnerComponent },
  { path: 'login', component: OwnerLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }