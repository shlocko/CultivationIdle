import { Item } from "./store";

export const items = {
	// Materials
	Herb: {
		name: "Herb",
		type: "material",
	},
	Goo: {
		name: "Goo",
		type: "material"
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
		damage: 8,
		weaponType: "Sword",
	},
	Axe: {
		name: "Axe",
		type: "weapon",
		damage: 12,
		weaponType: "Axe",
	},
	Dagger: {
		name: "Dagger",
		type: "weapon",
		damage: 4,
		weaponType: "Dagger",
	},
} as const;

export type ItemNames = keyof typeof items;

export const getItem = (name: ItemNames): Item => {
	return items[name];
};

//export const itemByName = (string: typeof (items));
