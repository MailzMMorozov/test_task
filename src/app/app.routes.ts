import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user/:username',
        loadChildren: './+user#UserModule'
      }
    ]
  },
  {path: '404', component: NoContentComponent},
  {path: '**', component: NoContentComponent},
];
