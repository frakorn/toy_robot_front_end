import { TestBed } from '@angular/core/testing';

import { TabletopService } from './tabletop.service';

describe('TabletopService', () => {
  let service: TabletopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabletopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
