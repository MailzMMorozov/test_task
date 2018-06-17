import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export interface User {
  login: string;
  name: string;
  email: string;
  location: string;
  followers: number;
  repos_url: string;
}

export interface Repo {
  name: string;
  full_name: string;
  description: string;
  pulls_url: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  url: string;
  html_url: string;
  source: Repo;
  parent: Repo;
  owner: User;
}

export interface Pull {
  state: string;
}

enum API {
  users = 'users',
  repos = 'repos',
  pulls = 'pulls'
}

export const GITHUB_API_URL = 'https://api.github.com';

@Injectable()
export class GithubApiService {

  constructor(private http: HttpClient) {
  }

  public getUser(username: string): Observable<User> {
    return this.http
      .get<User>(`${GITHUB_API_URL}/${API.users}/${username}`)
      .share();
  }

  public getRepos({repos_url}: User): Observable<Repo[]> {
    return this.http
      .get<Repo[]>(repos_url)
      .share();
  }

  public getRepo(username: string, repoName: string): Observable<Repo> {
    return this.http
      .get<Repo>(`${GITHUB_API_URL}/${API.repos}/${username}/${repoName}`)
      .share();
  }

  public getPulls(username: string, repoName: string): Observable<Pull[]> {
    return this.http
      .get<Pull[]>(`${GITHUB_API_URL}/${API.repos}/${username}/${repoName}/${API.pulls}`)
      .share();
  }
}
