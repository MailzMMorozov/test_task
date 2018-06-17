import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ROUTES } from '../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { NoContentComponent } from '../no-content';

/*
  Mandatory test for Component
 */
describe(`Home`, () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NoContentComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes(ROUTES)]
    })
    /**
     * Compile template and css.
     */
      .compileComponents();
    router = TestBed.get(Router);
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });

  describe('openUserPage', () => {

    beforeEach(() => {
      spyOn(router, 'navigate');
    });

    it('should redirect to user', () => {
      comp.openUserPage('user1');
      expect(router.navigate)
        .toHaveBeenCalledWith(['user', 'user1']);

    });

  });

});
