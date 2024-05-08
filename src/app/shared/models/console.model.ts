export enum CommandList {
    PLACE = 'PLACE',
    MOVE = 'MOVE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    REPORT = 'REPORT',
    CLOSE = 'CLOSE',
    CLEAR = 'CLEAR'
}

export enum DirectionList{
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST'
}

export enum ErrorMessage{
    PLACE_ROBOT = 'Place the robot in the tabletop',
    FORMAT_NOT_CORRECT = 'Command format not correct',
    VALID_COMMAND = 'Insert a valid command',
    COMMAND_NOT_FOUND = 'Command not found',
    PARAMETERS_NOT_CORRECT = 'One or more parameter are not correct'
}

export interface CommandState{
    success: boolean,
    message: string,
    command?: string[]
}