export interface Enemy {
	alive: boolean;
	health: number;
	damage: number;
	name: string;
}

export type Enemies = keyof typeof enemyList;

export const enemyList = {
	bandit: {
		name: "Bandit",
		health: 10,
		damage: 2,
		alive: true,
	} as Enemy,
	bear: {
		name: "Bear",
		health: 25,
		damage: 4,
		alive: true,
	} as Enemy,
	wanderingKnight: {
		name: "Wandering Knight",
		health: 75,
		damage: 6,
		alive: true,
	} as Enemy,
};
