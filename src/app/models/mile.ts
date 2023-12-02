export interface ILetterBox {
    readonly number: number,
    readonly ownerId: number,
    line1: ITenants[],
    line2: ITenants[]
}

export interface IPackageBox {
    readonly id: number,
    readonly displayNumber: number,
    readonly localIndex: number,
    readonly size: number
}

export interface IBoxes {
    letterBoxes: ILetterBox[],
    packageBoxes: IPackageBox[]
}

interface ITenants {
    language: string,
    name: string
}