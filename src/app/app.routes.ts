import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AssetListComponent } from './pages/assets/asset-list/asset-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'assets', component: AssetListComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];
