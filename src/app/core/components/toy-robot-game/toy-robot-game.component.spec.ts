import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToyRobotGameComponent } from './toy-robot-game.component';

describe('ToyRobotGameComponent', () => {
  let component: ToyRobotGameComponent;
  let fixture: ComponentFixture<ToyRobotGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToyRobotGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToyRobotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
