export type Enemy = {
	alive: boolean;
	health: number;
	damage: number;
	name: string;
	sprite: string;
}

export type Enemies = keyof typeof enemyList;

export const enemyList: Record<string, Enemy> = {
	goblin: { name: "Goblin", health: 40, damage: 4, alive: true, sprite: "goblin.png" },
	bear: { name: "Bear", health: 150, damage: 8, alive: true, sprite: "bear.png" },
	qiBear: { name: "Qi Bear", health: 300, damage: 16, alive: true, sprite: "qi-bear.png" },
	slime: { name: "Slime", health: 50, damage: 3, alive: true, sprite: "slime.png" },
	yellowSlime: { name: "Yellow Slime", health: 125, damage: 10, alive: true, sprite: "yellow-slime.png" },
	wolf: { name: "Wolf", health: 100, damage: 12, alive: true, sprite: "wolf.png" },
	scalyThing: { name: "Scaly Thing", health: 350, damage: 18, alive: true, sprite: "scaly-thing.png" },
	cow: { name: "Cow", health: 75, damage: 2, alive: true, sprite: "cow.png" },
	smolCow: { name: "Smol Cow", health: 50, damage: 20, alive: true, sprite: "cow-smol.png" },
	bird: { name: "Bird", health: 60, damage: 6, alive: true, sprite: "bird.png" },
	terrorBird: { name: "Terror Bird", health: 250, damage: 20, alive: true, sprite: "terror-bird.png" },
	skeleman: { name: "Skeleman", health: 75, damage: 12, alive: true, sprite: "skeleman.png" },
	depressedSkeleman: { name: "Depressed Skeleman", health: 150, damage: 18, alive: true, sprite: "skeleman-depressed.png" },
	snake: { name: "Snake", health: 25, damage: 10, alive: true, sprite: "snake.png" },
	Cobra: { name: "Cobra", health: 90, damage: 22, alive: true, sprite: "cobra.png" },
	eyeBlue: { name: "Blue Eye", health: 100, damage: 15, alive: true, sprite: "eye-blue.png" },
	eyeGreen: { name: "Green Eye", health: 200, damage: 15, alive: true, sprite: "eye-green.png" },
	eyeRed: { name: "Red Eye", health: 350, damage: 35, alive: true, sprite: "eye-red.png" },
	mouse: { name: "Mouse", health: 30, damage: 2, alive: true, sprite: "mouse.png" },
	heart: { name: "Heart", health: 5, damage: -25, alive: true, sprite: "heart.png" },
};
