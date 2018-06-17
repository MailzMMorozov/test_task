import { TestScheduler } from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';
import { TestMessage } from 'rxjs/testing/TestMessage';

const EXTRA_ERROR_PROPS = ['line', 'sourceURL', 'stack'];

/*
  Helper taken from current project
 */
function take({frame, notification: {kind, value, hasValue, error}}: any) {
  let _errorFix: any;
  if (error) {
    _errorFix = {};
    Object.keys(error)
      .forEach((key: string) => {
        if (EXTRA_ERROR_PROPS.indexOf(key) === -1) {
          _errorFix[key] = error[key];
        }
      });
  }
  return {
    frame, notification: {kind, value, hasValue, error: _errorFix}
  };
}

interface CallInfoRelaxed {
  object?: any;
  args?: any[];
  returnValue?: any;
}

function testSchedulerSpec(): TestScheduler {
  new Observable<any>(); // tslint:disable-line:no-unused-expression // need it to import all Observable methods from rxjs

  return new TestScheduler((a: TestMessage[], b: TestMessage[]) => {
    const _a = a.map(take);
    const _b = b.map(take);

    expect(_a)
      .toEqual(_b);
  });
}

function observeSpy(spy: jasmine.Spy): Observable<jasmine.CallInfo> {
  const subject = new Subject<jasmine.CallInfo>();
  spyOn((spy.calls as any), 'track')
    .and.callFake((call: jasmine.CallInfo) => subject.next(call));
  return subject.asObservable();
}

/**
 * Observes the spy against async expectations.
 *
 * @param scheduler The TestScheduler instance
 * @param spy to observe calls of
 * @param marbles expected marbles
 * @param values expected values
 * @returns {Observable<CallInfo>}
 */
function expectSpy(scheduler: TestScheduler,
                   spy: jasmine.Spy,
                   marbles: string,
                   values: { [key: string]: CallInfoRelaxed } = {}): Observable<jasmine.CallInfo> {

  const calls = observeSpy(spy).share();

  const expectedCalls: any = {};

  Object.keys(values)
    .forEach((key: any) => expectedCalls[key] = jasmine.objectContaining(values[key]));

  scheduler.expectObservable(calls)
    .toBe(marbles, expectedCalls);

  return calls;
}

export { expectSpy, observeSpy, testSchedulerSpec };
