export type Enemy = {
	alive: boolean;
	health: number;
	damage: number;
	name: string;
	sprite: string;
	damagePending: number;
}

export type Enemies = keyof typeof enemyList;

export const enemyList: Record<string, Enemy> = {
	goblin: { name: "Goblin", health: 40, damage: 4, alive: true, sprite: "goblin.png", damagePending: 0 },
	bear: { name: "Bear", health: 150, damage: 8, alive: true, sprite: "bear.png", damagePending: 0 },
	qiBear: { name: "Qi Bear", health: 300, damage: 16, alive: true, sprite: "qi-bear.png", damagePending: 0 },
	slime: { name: "Slime", health: 50, damage: 3, alive: true, sprite: "slime.png", damagePending: 0 },
	yellowSlime: { name: "Yellow Slime", health: 125, damage: 10, alive: true, sprite: "yellow-slime.png", damagePending: 0 },
	wolf: { name: "Wolf", health: 100, damage: 12, alive: true, sprite: "wolf.png", damagePending: 0 },
	scalyThing: { name: "Scaly Thing", health: 350, damage: 18, alive: true, sprite: "scaly-thing.png", damagePending: 0 },
	cow: { name: "Cow", health: 75, damage: 2, alive: true, sprite: "cow.png", damagePending: 0 },
	smolCow: { name: "Smol Cow", health: 50, damage: 20, alive: true, sprite: "cow-smol.png", damagePending: 0 },
	bird: { name: "Bird", health: 60, damage: 6, alive: true, sprite: "bird.png", damagePending: 0 },
	terrorBird: { name: "Terror Bird", health: 250, damage: 20, alive: true, sprite: "terror-bird.png", damagePending: 0 },
	skeleman: { name: "Skeleman", health: 75, damage: 12, alive: true, sprite: "skeleman.png", damagePending: 0 },
	depressedSkeleman: { name: "Depressed Skeleman", health: 150, damage: 18, alive: true, sprite: "skeleman-depressed.png", damagePending: 0 },
	snake: { name: "Snake", health: 25, damage: 10, alive: true, sprite: "snake.png", damagePending: 0 },
	Cobra: { name: "Cobra", health: 90, damage: 22, alive: true, sprite: "cobra.png", damagePending: 0 },
	eyeBlue: { name: "Blue Eye", health: 100, damage: 15, alive: true, sprite: "eye-blue.png", damagePending: 0 },
	eyeGreen: { name: "Green Eye", health: 200, damage: 15, alive: true, sprite: "eye-green.png", damagePending: 0 },
	eyeRed: { name: "Red Eye", health: 350, damage: 35, alive: true, sprite: "eye-red.png", damagePending: 0 },
	mouse: { name: "Mouse", health: 30, damage: 2, alive: true, sprite: "mouse.png", damagePending: 0 },
	heart: { name: "Heart", health: 5, damage: -25, alive: true, sprite: "heart.png", damagePending: 0 },
};
