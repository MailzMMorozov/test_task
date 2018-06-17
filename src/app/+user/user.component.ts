import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GithubApiService, Repo, User } from './githubApi.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user',
  templateUrl: './user.template.html',
  styleUrls: ['user.style.scss']
})
export class UserComponent {

  private user: Observable<User> = this.route
    .data
    .map(({user}: any) => user)
    .publishReplay(1)
    .refCount();

  // tslint:disable:member-ordering
  public name: Observable<string> = this.user
    .map(({name}) => name);

  public email: Observable<string> = this.user
    .map(({email}) => email);

  public location: Observable<string> = this.user
    .map(({location}) => location);

  public followers: Observable<number> = this.user
    .map(({followers}) => followers);

  public repos: Observable<Repo[]> = this.user
    .switchMap((user: User) => this.githubApiService.getRepos(user))
    .publishReplay(1)
    .refCount();
  // tslint:enable:member-ordering

  constructor(private route: ActivatedRoute, private githubApiService: GithubApiService) {
  }

}
