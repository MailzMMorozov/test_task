import { UserResolver } from './user.resolver';
import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs/Rx';
import { testSchedulerSpec } from '../../testScheduler.spec';

const API_URL = 'https://api.github.com';

/*
  Mandatory test for Resolver
 */
describe(`UserResolver`, () => {
  let sut: UserResolver;
  let scheduler: TestScheduler;
  let githubApiServiceMock: any;
  let userMock: Observable<any>;
  let routerMock: any;

  beforeEach(() => {
    scheduler = testSchedulerSpec();
    userMock = scheduler.createHotObservable('-#', {}, new Error('ERROR'));
    githubApiServiceMock = {
      getUser: jasmine.createSpy('getUser')
        .and.returnValue(userMock)
    };
    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    sut = new UserResolver(githubApiServiceMock, routerMock);
    spyOn(console, 'error');
  });

  describe('resolve', () => {
    let activatedRouteMock: any;

    beforeEach(() => {
      activatedRouteMock = {parent: {params: {username: 'user1'}}};
    });

    it('should getUser from githubApi', () => {
      sut.resolve(activatedRouteMock);
      expect(githubApiServiceMock.getUser)
        .toHaveBeenCalledWith('user1');
    });

    it('should log error', () => {
      sut.resolve(activatedRouteMock).subscribe();
      scheduler.flush();
      expect(console.error)
        .toHaveBeenCalledWith(new Error('ERROR'));
    });

    it('should redirect to 404 when error', () => {
      sut.resolve(activatedRouteMock).subscribe();
      scheduler.flush();
      expect(routerMock.navigateByUrl)
        .toHaveBeenCalledWith('404');
    });

    it('should return observable', () => {
      scheduler.expectObservable(sut.resolve(activatedRouteMock))
        .toBe('-|');
      scheduler.flush();
    });

  });

});
