import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService, Repo } from '../githubApi.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'repo',
  templateUrl: './repo.template.html',
})
export class RepoComponent {

  private repo$: Observable<Repo> = this
    .route
    .data
    .map(({repo}) => repo)
    .publishReplay(1)
    .refCount();

  // tslint:disable:member-ordering
  public description$: Observable<string> = this
    .repo$
    .map(({description}) => description);

  public fork$: Observable<boolean> = this
    .repo$
    .map(({fork}) => fork);

  public source$: Observable<Repo> = this
    .repo$
    .map(({source}) => source);

  public parent$: Observable<Repo> = this
    .repo$
    .map(({parent}) => parent);

  public starsCount$: Observable<number> = this
    .repo$
    .map(({stargazers_count}) => stargazers_count);

  public forksCount$: Observable<number> = this
    .repo$
    .map(({forks_count}) => forks_count);

  public openIssuesCount$: Observable<number> = this
    .repo$
    .map(({open_issues_count}) => open_issues_count);

  public openPrsCount$: Observable<null | number> = this
    .repo$
    .switchMap((repo: Repo) => this.githubApiService.getPulls(repo.owner.login, repo.name))
    .map((pulls: any[]) => pulls.length)
    .startWith(null);

  // tslint:enable:member-ordering

  constructor(private route: ActivatedRoute,
              private githubApiService: GithubApiService) {
  }

}
