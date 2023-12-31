import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'upload-docs/:userId',
    loadChildren: () => import('./pages/auth/upload-docs/upload-docs.module').then( m => m.UploadDocsPageModule)
  },
  {
    path: 'otp-modal',
    loadChildren: () => import('./modal/otp-modal/otp-modal.module').then( m => m.OtpModalPageModule)
  },
  {
    path: 'success-modal',
    loadChildren: () => import('./modal/success-modal/success-modal.module').then( m => m.SuccessModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
