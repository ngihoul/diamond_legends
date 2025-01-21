import { Country } from "./country.model";

export interface Player {
    id: number;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    nationality: Country;
    positions: PositionType[];
    throw: HandedType;
    bat: HandedType;
    salary: number;
    energy: number;
    contact: number;
    contactPotential: number;
    power: number;
    powerPotential: number;
    running: number;
    runningPotential: number;
    defense: number;
    defensePotential: number;
    mental: number;
    mentalPotential: number;
    stamina: number;
    staminaPotential: number;
    control: number;
    controlPotential: number;
    velocity: number;
    velocityPotential: number;
    movement: number;
    movementPotential: number;
}

export enum PositionType {
    "SP" = 1,
    "C" = 2,
    "1B" = 3,
    "2B" = 4,
    "3B" = 5,
    "SS" = 6,
    "LF" = 7,
    "CF" = 8,
    "RF" = 9,
    "DH" = 10,
    "UTL" = 11,
    "RP" = 12,
    "CL" = 13
}

export enum HandedType {
    "R" = 0,
    "L" = 1
}