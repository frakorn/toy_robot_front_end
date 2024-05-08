import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotPosition } from 'src/app/core/models/toy-robot.game.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'robot',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss',
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("50ms 50ms", style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RobotComponent {

  @Input() robot?: RobotPosition;
  @Input() x!: number;
  @Input() y!: number;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
