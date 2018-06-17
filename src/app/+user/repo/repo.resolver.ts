import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { GithubApiService } from '../githubApi.service';

@Injectable()
export class RepoResolver implements Resolve<any> {

  constructor(private githubApiService: GithubApiService,
              private router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    console.log(route);
    return this.githubApiService
      .getRepo(route.parent.params.username, route.params.reponame)
      .catch((error: HttpErrorResponse) => {
        // here have to be handling of all types of errors
        console.error(error);
        this.router.navigateByUrl('404');
        return Observable.empty();
      });
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const REPO_RESOLVER_PROVIDERS = [
  RepoResolver
];
