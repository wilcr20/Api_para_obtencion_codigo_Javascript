import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { DocumentationComponent } from 'src/components/documentation/documentation.component';
import { AuthComponent } from 'src/components/auth/auth.component';

const routes: Routes = [                    //Direcciones de rutas para uso de cada componente
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'docu', component: DocumentationComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
