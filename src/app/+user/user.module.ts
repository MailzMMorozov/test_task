import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './user.routes';
import { UserComponent } from './user.component';
import { USER_RESOLVER_PROVIDERS } from './user.resolver';
import { GithubApiService } from './githubApi.service';
import { REPO_RESOLVER_PROVIDERS, RepoComponent } from './repo';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    UserComponent,
    RepoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    GithubApiService,
    USER_RESOLVER_PROVIDERS,
    REPO_RESOLVER_PROVIDERS
  ]
})
export class UserModule {
  public static routes = routes;
}
