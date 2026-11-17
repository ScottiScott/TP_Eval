import { Character } from "./Character";

export class Warrior extends Character {
    public static readonly RAGE_MULTIPLIER: number = 1.5;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        super(name, health, baseAttack, baseDefense)
    };

    public isEnraged(): boolean {
        if(this.health <= this.maxHealth/2) {
            return true
        }
        return false;
    }
}