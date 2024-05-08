import { TestBed } from '@angular/core/testing';
import { ConsoleService } from './console.service';

describe('ConsoleService', () => {
  let service: ConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize robotPlaced as false', () => {
    expect(service.robotPlaced).toBeFalse();
  });

  it('should set robotPlaced to true', () => {
    service.robotPlaced = true;
    expect(service.robotPlaced).toBeTrue();
  });

  it('should return correct command state for valid single commands', () => {
    expect(service.checkCommand('MOVE').success).toBeTrue();
    expect(service.checkCommand('LEFT').success).toBeTrue();
    expect(service.checkCommand('RIGHT').success).toBeTrue();
    expect(service.checkCommand('REPORT').success).toBeTrue();
    expect(service.checkCommand('CLEAR').success).toBeTrue();
    expect(service.checkCommand('CLOSE').success).toBeTrue();
  });

  it('should return correct command state for PLACE command', () => {
    const validPlaceCommand = 'PLACE 1,2,NORTH';
    const invalidPlaceCommand = 'PLACE A,B,C';

    expect(service.checkCommand(validPlaceCommand).success).toBeTrue();
    expect(service.checkCommand(invalidPlaceCommand).success).toBeFalse();
  });

  it('should return correct command state for other commands', () => {
    const invalidCommand = 'INVALID';
    expect(service.checkCommand(invalidCommand).success).toBeFalse();
  });
});