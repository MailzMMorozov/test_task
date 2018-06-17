import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { GithubApiService } from './githubApi.service';

@Injectable()
export class UserResolver implements Resolve<any> {

  constructor(private githubApiService: GithubApiService,
              private router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    return this.githubApiService
      .getUser(route.parent.params.username)
      .catch((error: HttpErrorResponse) => {
        // here have to be handling of all types of errors
        console.error(error);
        this.router.navigateByUrl('404');
        return Observable.empty();
      });
  }
}

export const USER_RESOLVER_PROVIDERS = [
  UserResolver
];
