import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TabletopComponent } from 'src/app/features/tabletop/components/tabletop/tabletop.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConsoleComponent } from 'src/app/features/console/components/console/console.component';
import { RobotPosition } from '../../models/toy-robot.game.model';
import { CommandList, CommandState } from 'src/app/shared/models/console.model';
import { ToyRobotGameService } from 'src/app/shared/services/toy-robot/toy-robot-game.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { ConsoleService } from 'src/app/shared/services/console/console.service';

@Component({
  selector: 'app-toy-robot-game',
  standalone: true,
  imports: [
    MatProgressBarModule,
    TabletopComponent,
    MatToolbarModule,
    ConsoleComponent,
    BrowserModule,
    MatSnackBarModule,
  ],
  templateUrl: './toy-robot-game.component.html',
  styleUrl: './toy-robot-game.component.scss'
})
export class ToyRobotGameComponent {

  textColor!: string;
  robotPosition!: RobotPosition;
  showConsole: boolean = true;
  showTable: boolean = false;
  timerInterval: number = 60000;
  time!: string;

  constructor(
    private toyRobotService: ToyRobotGameService,
    private toastNotification: MatSnackBar,
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {
    this.time = this.getCurrentTime();
    setInterval(() => {
      this.time = this.getCurrentTime();
    }, this.timerInterval);
  }

  getCurrentTime() {
    const dateObj = new Date();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0');
  }

  // manage all the user command received from consolle
  receiveCommand(commandState: CommandState) {
    const commandType: string = commandState?.command![0];
    switch (commandType) {
      case CommandList.CLOSE:
        this.showTable = false
        this.consoleService.robotPlaced = false;
        break;
      case CommandList.PLACE:
        this.showTable = true;
        this.toyRobotService.executePlaceCommand(commandState);
        break;
      case CommandList.MOVE:
        this.toyRobotService.executeMoveCommand()
        break;
      case CommandList.LEFT:
      case CommandList.RIGHT:
        this.toyRobotService.executeRotate(commandType)
        break;
      case CommandList.REPORT:
        this.executeReport();
        break;
    }
  }

  openConsole(){
    this.showConsole = true;
  }

  closeConsole(){
    this.showConsole = false;
  }

  // launch a toast notification about robot position
  executeReport(){
    const x = this.toyRobotService.robotPosition()?.x;
    const y = this.toyRobotService.robotPosition()?.y;
    const orientation = this.toyRobotService.robotPosition()?.orientation;
    const message = `Your Robot's coordinates are x:${x} y:${y} Orientation: ${orientation?.toUpperCase()}`;
    this.toastNotification.open(message, '', {
      duration: 5000
    });
  }

}
