import { TestBed } from '@angular/core/testing';

import { ToyRobotGameService } from './toy-robot-game.service';

describe('ToyRobotGameService', () => {
  let service: ToyRobotGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToyRobotGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
