export type Enemy = {
	alive: boolean;
	health: number;
	damage: number;
	name: string;
	sprite: string;
}

export type Enemies = keyof typeof enemyList;

export const enemyList: Record<string, Enemy> = {
	goblin: {
		name: "Goblin",
		health: 5,
		damage: 5,
		alive: true,
		sprite: "goblin.png",
	},
	bear: {
		name: "Bear",
		health: 15,
		damage: 3,
		alive: true,
		sprite: "bear.png"
	},
	wanderingKnight: {
		name: "Wandering Knight",
		health: 75,
		damage: 6,
		alive: true,
		sprite: "wanderingKnight.png",
	},
	slime: {
		name: "Slime",
		health: 10,
		damage: 1,
		alive: true,
		sprite: "slime.png",
	},
	qiBear: {
		name: "Qi Bear",
		health: 35,
		damage: 8,
		alive: true,
		sprite: "qiBear.png",
	},

};
