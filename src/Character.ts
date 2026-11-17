import { Weapon } from "./Weapon";

export abstract class Character {
    public readonly name: string;
    public readonly maxHealth: number;
    public readonly baseAttack: number;
    public readonly baseDefense: number;
    private _health: number;
    private _weapon: Weapon | null = null;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        this.name = name;
        this.maxHealth = health;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this._health = health;

        if (health <= 0) {
            throw new Error(`The health of ${name} must be strictly positive.`)
        }
    }

    public get health(): number {
        return this._health;
    }

    public abstract getAttack(): number;

    public abstract canEquip(weapon: Weapon): boolean;

    protected getWeaponAttackBonus(): number {
        if (this._weapon === null ) {
            return 0;
        }
        return this._weapon.attackBonus;
    }

    public isAlive(): boolean {
        if (this.health > 0) {
            return true;
        } else {
            return false;
        }
    }

    public describe(): string {
        return `${this.name} - health ${this.health}/${this.maxHealth} - attack ${this.getAttack()} - defense ${this.baseDefense} - weapon: ${this._weapon ? this._weapon.name : "none"}`
    }

    public equip(weapon: Weapon): void {
        if (!this.canEquip(weapon)) {
            throw new Error(`${this.name} cannot equip ${weapon.name}`)
        }
        this._weapon = weapon;
    }

    public takeDamage(amount: number): void {
        this._health = this.health - amount;
        if (this._health < 0) {
            this._health = 0
        }
    }

    public heal(amount: number): void {
        this._health = this.health + amount
        if(this._health > this.maxHealth) {
            this._health = this.maxHealth
        }
    }

    protected computeDamage(target: Character): number {
        const damage = this.getAttack() - target.baseDefense;
        if (damage < 0) {
            return 0;
        }
        return damage;
    }

    public attack(target: Character): number {
        if(!this.isAlive()) {
            throw new Error(`${this.name} is KO and cannot attack.`)
        }

        if(target === this) {
            throw new Error(`${this.name} cannot attack themselves.`)
        }

        if(!target.isAlive()) {
            throw new Error(`${target.name} is already KO.`)
        }

        const damage = this.computeDamage(target)
        target.takeDamage(damage);

        console.log(`${this.name} hits ${target.name} for ${damage} damage (${target.name}: ${target._health}/${target.maxHealth}).`);

        if(!target.isAlive()) {
            console.log(`${target.name} is KO!`)
        }

        return damage;
    }
}