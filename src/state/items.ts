import { Item } from "./store";

export const items = {
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

//export const itemByName = (string: typeof (items));
