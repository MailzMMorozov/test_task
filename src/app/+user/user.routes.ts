import { UserComponent } from './user.component';

export const routes = [
  { path: '', children: [
    { path: '', component: UserComponent },
    { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
