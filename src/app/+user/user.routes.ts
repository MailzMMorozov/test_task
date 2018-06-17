import { UserComponent } from './user.component';
import { UserResolver } from './user.resolver';
import { RepoComponent, RepoResolver } from './repo';

export const routes = [
  {
    path: '', children: [
      {
        path: '',
        component: UserComponent,
        resolve: {
          user: UserResolver
        },
        children: [{
          path: 'repo/:reponame',
          component: RepoComponent,
          resolve: {
            repo: RepoResolver
          }
        }]
      }
    ]
  },
];
