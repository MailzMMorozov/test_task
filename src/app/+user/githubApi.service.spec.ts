import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GITHUB_API_URL, GithubApiService, Pull, Repo, User } from './githubApi.service';
import { TestRequest } from '@angular/common/http/testing/src/request';

/*
  Mandatory test for Service
 */
describe('GithubApiService', () => {
  let injector: TestBed;
  let sut: GithubApiService;
  let httpMock: HttpTestingController;
  let userMock: any;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    userMock = {
      name: 'name1',
      email: 'email1',
      location: 'location1',
      followers: 20,
      repos_url: 'REPO_URL'
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    injector = getTestBed();
    sut = injector.get(GithubApiService);
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUser', () => {

    it('should return User from github api', () => {
      sut
        .getUser('user1')
        .subscribe((user: User) => {
          expect(user)
            .toEqual(userMock);
        });
      const mockReq: TestRequest = httpMock.expectOne(GITHUB_API_URL + '/users/user1');
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(userMock);
    });

  });

  describe('getRepos', () => {
    let reposMock: any[];

    beforeEach(() => {
      reposMock = [
        {name: 'name1'},
        {name: 'name2'},
      ];
    });

    it('should return User from github api', () => {
      sut
        .getRepos(userMock)
        .subscribe((repos: Repo[]) => {
          expect(repos)
            .toEqual(reposMock);
        });
      const mockReq: TestRequest = httpMock.expectOne('REPO_URL');
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(reposMock);
    });

  });

  describe('getPulls', () => {
    let pulls: any[];
    let repoName: string;
    let username: string;

    beforeEach(() => {
      repoName = 'repo1';
      username = 'user1';
      pulls = [
        {state: 'open'},
        {state: 'closed'},
      ];
    });

    it('should return User from github api', () => {
      sut
        .getPulls(username, repoName)
        .subscribe((pulls1: Pull[]) => {
          expect(pulls1)
            .toEqual(pulls);
        });
      const mockReq: TestRequest = httpMock.expectOne(GITHUB_API_URL + '/repos/user1/repo1/pulls');
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(pulls);
    });

  });

});
