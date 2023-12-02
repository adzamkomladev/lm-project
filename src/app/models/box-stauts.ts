export interface IBoxStatus {
    number: number,
    content: BoxStatusContent.FULL | BoxStatusContent.EMPTY,
    door: BoxStatusDoor.OPEN | BoxStatusDoor.CLOSED
}

export enum BoxStatusContent {
    FULL = 'FULL',
    EMPTY = 'EMPTY'
}

export enum BoxStatusDoor {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED'
}