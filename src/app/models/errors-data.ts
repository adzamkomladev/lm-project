export interface IErrorData {
    content: string
}

export enum ErrorMsgs {
    incorrectCode = 'incorrectCode',
    deviceNotAvailable = 'deviceNotAvailable',
    serverProblem = "serverProblem",
    noEmptyBox = "noEmptyBox",
    boxAreFull = "boxAreFull"
  }