export class Indian {
    ID!: Number;
    Tribe!: string;
    Page!: Number;
    LastName!: string;
    FirstName!: string;
    MiddleName?: string;
    Suffix?: string;
    Age!: Number;
    Year!: YearOrYears;
    Sex!: Sex;
    Blood!: string;
    Relationship!: Relationship;
    RollNum!: Number;
    Source!: string;
    url?: string;
}

export enum YearOrYears {
    Year = 1,
    Years = 2
}

export enum Sex {
    Male = 1,
    Female = 2
}

export enum Relationship {
    Blood = 1,
    Marriage = 2
}