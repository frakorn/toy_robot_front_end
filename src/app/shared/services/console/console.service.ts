import { Injectable } from '@angular/core';
import { CommandList, CommandState, DirectionList, ErrorMessage } from 'src/app/shared/models/console.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  private _robotPlaced: boolean = false;

  get robotPlaced(): boolean {
    return this._robotPlaced;
  }

  set robotPlaced(flag: boolean) {
    this._robotPlaced = flag;
  }

  // check command from the user input and return a state as response
  checkCommand(command: string): CommandState {
    command = command.trim();
    let message:string = '';
    if (!command) {
      return { success: false, message: ErrorMessage.VALID_COMMAND };
    }
    const commandParts = command.split(' ');
    if (commandParts.length === 1) {
      const isSingleCommandValid = this.checkSingleCommand(commandParts[0]);
      const isClearCommand = commandParts[0] === CommandList.CLEAR;
      message = !isSingleCommandValid ? ErrorMessage.COMMAND_NOT_FOUND : isSingleCommandValid && !this.robotPlaced ? ErrorMessage.PLACE_ROBOT : commandParts[0];
      return { success: (this.robotPlaced && isSingleCommandValid) || isClearCommand, message: message, command: commandParts };
    }
    if (commandParts.length === 2 && commandParts[0] === 'PLACE') {
      return this.checkPlaceCommand(commandParts,command)
    }
    return { success: false, message: ErrorMessage.FORMAT_NOT_CORRECT };
  }

  checkSingleCommand(command: string): boolean{
    switch (command) {
      case CommandList.MOVE:
      case CommandList.LEFT:
      case CommandList.RIGHT:
      case CommandList.REPORT:
      case CommandList.CLEAR:
      case CommandList.CLOSE:
        return true;
      default:
        return false;
    }
  }

  checkDirection(command: string): boolean{
    switch (command) {
      case DirectionList.NORTH:
      case DirectionList.SOUTH:
      case DirectionList.WEST:
      case DirectionList.EAST:
        return true;
      default:
        return false;
    }
  }

  checkX(x: number): boolean{
    return x >=0 && x < environment.tableTop.x;
  }

  checkY(y: number): boolean{
    return y >=0 && y < environment.tableTop.y;
  }

  // function that check the correctness of the place command and return a state
  checkPlaceCommand(command: string[], commandText:string) : CommandState{
    const [commandType, commandPosition] = command;
    if (commandType.trim() !== CommandList.PLACE) {
      return { success: false, message: ErrorMessage.COMMAND_NOT_FOUND }
    }
    const positionParts = commandPosition.split(',');
    if (positionParts.length !== 3) {
      return { success: false, message: ErrorMessage.FORMAT_NOT_CORRECT }
    }
    const [xInput, yInput, direction] = positionParts;
    const x = parseInt(xInput);
    const y = parseInt(yInput);
    const validity = this.checkX(x) && this.checkY(y) && this.checkDirection(direction);
    return { success: validity, message: validity ? commandText : ErrorMessage.PARAMETERS_NOT_CORRECT, command: command }
  }
}
