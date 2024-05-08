import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCaseDirective } from 'src/app/shared/directives/upper-case.directive';
import { ConsoleService } from 'src/app/shared/services/console/console.service';
import { CommandList, CommandState } from 'src/app/shared/models/console.model';

@Component({
  selector: 'console',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    UpperCaseDirective
  ],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export class ConsoleComponent {

  @Output() sendCommand = new EventEmitter<CommandState>();
  @Output() onClose = new EventEmitter<boolean>();
  @Input() tableActive?: boolean;
  @ViewChild('hiddenInput') inputElement!: ElementRef;
  command: string = '';
  isOpen: boolean = true;
  fullSize: boolean = false;
  promptMessages: CommandState[] = [];

  constructor(
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {
  }

  toggleSize() {
    this.fullSize = !this.fullSize;
  }

  close() {
    this.onClose.emit(false);
  }

  clear() {
    this.promptMessages = [];
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }

  // manage all the user commands
  send() {
    const status: CommandState = this.consoleService.checkCommand(this.command);
    this.promptMessages.push({ success: status.success, message: status.message })
    if (status.success) {
      switch (this.command) {
        case CommandList.CLEAR:
          this.clear();
          break;
        default:
          this.sendCommand.emit(status);
          break;
      }
    }
    this.command = '';
  }
}
