import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { LoginGuard} from './login.guard'

describe('loginGuard', () => {
  let service : LoginGuard
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
