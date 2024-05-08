import { Injectable, WritableSignal, signal } from '@angular/core';
import { CommandList, CommandState, DirectionList } from 'src/app/shared/models/console.model';
import { RobotPosition } from 'src/app/core/models/toy-robot.game.model';
import { ConsoleService } from 'src/app/shared/services/console/console.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ToyRobotGameService {

  constructor(
    private consoleService: ConsoleService
  ) { }

  robotPosition: WritableSignal<RobotPosition | undefined> = signal(undefined);

  // execute the place command and set the robotPosition signal variable
  executePlaceCommand(commandState:CommandState){
    const commandInfo: string[] = commandState?.command![1]?.split(',');
    const x = parseInt(commandInfo[0]);
    const y = parseInt(commandInfo[1]);
    const orientation = commandInfo[2];
    const robotPosition = { x:x, y:y, orientation:orientation }
    this.setRobotPosition(robotPosition);
    this.consoleService.robotPlaced = true;
  }

  // execute the move command and set the robotPosition signal variable
  executeMoveCommand() {
    let x = this.robotPosition()?.x!;
    let y = this.robotPosition()?.y!;
    const orientation = this.robotPosition()?.orientation!;
    switch (orientation) {
      case DirectionList.NORTH:
        y < (environment.tableTop.y - 1) ? y++ : y;
        break;
      case DirectionList.SOUTH:
        y > 0 ? y-- : y;
        break;
      case DirectionList.WEST:
        x > 0 ? x-- : x;
        break;
      case DirectionList.EAST:
        x < (environment.tableTop.x - 1) ? x++ : x;
        break;
    }
    this.setRobotPosition({ x:x, y:y, orientation:orientation })
  }

  // execute the rotate command and update the robotPosition signal variable
  executeRotate(commandType: string) {
    let orientation = this.robotPosition()?.orientation!;
    switch (orientation) {
      case DirectionList.NORTH:
        orientation = commandType === CommandList.LEFT ? DirectionList.WEST : CommandList.RIGHT ? DirectionList.EAST : orientation;
        break;
      case DirectionList.SOUTH:
        orientation = commandType === CommandList.LEFT ? DirectionList.EAST : CommandList.RIGHT ? DirectionList.WEST : orientation;
        break;
      case DirectionList.WEST:
        orientation = commandType === CommandList.LEFT ? DirectionList.SOUTH : CommandList.RIGHT ? DirectionList.NORTH : orientation;
        break;
      case DirectionList.EAST:
        orientation = commandType === CommandList.LEFT ? DirectionList.NORTH : CommandList.RIGHT ? DirectionList.SOUTH : orientation;
        break;
    }
    this.updateRobotPosition(orientation)
  }

  // update signal variable
  updateRobotPosition(orientation:string){
    this.robotPosition.update(r => {
      r!.orientation = orientation;
      return r;
    });
  }

  // set signal variable
  setRobotPosition(position:RobotPosition){
    this.robotPosition.set(position);
  }

}

