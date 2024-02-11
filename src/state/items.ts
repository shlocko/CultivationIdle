import { Item } from "./store";

type Items = {
	[key: string]: Item;
};

export const items: Items = {
	// Materials
	Herb: {
		name: "Herb",
		type: "material",
	},
	Berry: {
		name: "Berry",
		type: "material",
	},
	"Glass Bottle": {
		name: "Glass Bottle",
		type: "material",
	},
	// Comsumables
	"Health Potion": {
		name: "Health Potion",
		type: "consumable",
	},
	"Mana Potion": {
		name: "Mana Potion",
		type: "consumable",
	},
	// Weapons
	Sword: {
		name: "Sword",
		type: "weapon",
		damage: 6,
	},
	Dagger: {
		name: "Dagger",
		type: "weapon",
		damage: 4,
	},
};

export type ItemNames = keyof typeof items;

export const getItem = (name: ItemNames): Item => {
	return items[name];
};

//export const itemByName = (string: typeof (items));
