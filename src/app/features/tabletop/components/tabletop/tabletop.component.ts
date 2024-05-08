import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TabletopService } from '../../services/tabletop.service';
import { TableTopItem } from '../../models/tabletop.model';
import { RobotComponent } from 'src/app/features/robot/components/robot/robot.component';
import { ToyRobotGameService } from 'src/app/shared/services/toy-robot/toy-robot-game.service';
import { RobotPosition } from 'src/app/core/models/toy-robot.game.model';

@Component({
  selector: 'app-tabletop',
  standalone: true,
  imports: [
    CommonModule,
    RobotComponent
  ],
  templateUrl: './tabletop.component.html',
  styleUrl: './tabletop.component.scss',
})

export class TabletopComponent {

  rows: number = environment.tableTop.x;
  columns: number = environment.tableTop.y;
  tableTop: TableTopItem[] = [];
  robot?: RobotPosition;

  constructor(
    private tableTopService: TabletopService,
    private toyRobotGameService: ToyRobotGameService
  ) { 
    effect(() => {
      this.robot = this.toyRobotGameService.robotPosition();
    })
  }

  ngOnInit(): void {
    this.tableTop = this.tableTopService.generateGrid();
  }

}
