import { createSignal, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import {
	adventureTick,
	meditateTick,
	trainTick,
} from "../functions/tickMethods";
import toast from "solid-toast";
import { ModalMessageType, sendModal } from "./modalMessages";
import {
	EffectType,
	techniqueCustomEffect,
} from "../functions/techniqueMethods";
import { Enemy, enemyList } from "./enemies";
import { cloneDeep } from "lodash";
import { effectMultiplier } from "../functions/combatMethods";
import { actionChoice } from "../components/Combat";
import { ItemNames, items } from "./items";
import { intro } from "../functions/sequenceMethods";
import { AreaNames, AreaState, areas } from "../areas/area";

type Action = "Meditate" | "Train" | "Adventure";

// Old, here for reference to rank names until I finish rankInfo
type Rank =
	| "Foundation"
	| "CoreFormation"
	| "RedCore"
	| "GreenCore"
	| "GoldCore"
	| "SilverCore"
	| "WhiteCore"
	| "Enlightened"
	| "Lord"
	| "Ancient"
	| "FreeImmortal"
	| "HighImmortal"
	| "TrueImmortal";

// Gamedata on the ranks of advancement
export const rankInfo = [
	{ name: "Foundation", advMana: 20 },
	{ name: "CoreFormation", advMana: 80 },
	{ name: "RedCore", advMana: 250 },
	{ name: "GreenCore", advMana: 750 },
	{ name: "GoldCore", advMana: 2000 },
	{ name: "SilverCore", advMana: 6500 },
	{ name: "WhiteCore", advMana: 20000 },
	{ name: "Enlightened", advMana: 60000 },
];

// Available aspects at CoreFormation rank

export type Aspect = (typeof aspects)[number];

export const aspects = [
	"Fire",
	"Water",
	"Stone",
	"Wind",
	"Sword",
	"Pure",
	"Shadow",
];

//********************************************************
// techniques
//********************************************************
export type TechniqueType = "Shaper" | "Enhancement" | "Range" | "Area";

export interface Technique {
	name: string;
	aspect: Aspect;
	type?: TechniqueType;
	baseCost: number;
	minCost: number;
	magnitude: number;
	aggregateEffect: number;
	effect: undefined | EffectType;
	customEffect: undefined | keyof typeof techniqueCustomEffect;
	onGoing: boolean; // whether the technique is an ongoing effect vs a one time use
	active: boolean; // Whether the technique is currently active
	continuous: boolean;
	description: string;
	mastery: number;
	multiplier: number;
}

//********************************************************
// Meditation Tecniques
//********************************************************
export interface meditationTechnique {
	name: string;
	id: string;
	description: string;
	level: number;
}

export const meditationTechniques: meditationTechnique[] = [
	{
		name: "Mana Regeneration",
		id: "manaregen",
		description: "Regenerate mana at an increased rate",
		level: 1,
	},
	{
		name: "Health Regen",
		id: "healthregen",
		description: "Regenerate health at an increased rate",
		level: 1,
	},
	{
		name: "Mixed Regeneration",
		id: "mixedregen",
		description:
			"Regenerate both health and mana at a minorly increased rate",
		level: 1,
	},
];

//********************************************************
// items
//********************************************************

export type ItemType = "consumable" | "weapon" | "material";

export type WeaponType = "Sword" | "Dagger" | "Axe" | "LongSword";

export type Weapon = {
	name: string;
	type: "weapon";
	damage: number;
	weaponType: WeaponType;
};

export type Consumable = {
	name: string;
	type: "consumable";
};

export type Material = {
	name: string;
	type: "material";
};

export type Item = Weapon | Material | Consumable;

export type LootTableItem = {
	item: Item;
	chance: number;
	min: number;
	max: number;
};

export type LootTable = LootTableItem[];

export const lootEntry = (
	name: ItemNames,
	chance: number,
	max: number,
	min: number,
): LootTableItem => {
	return {
		item: items[name],
		chance: chance,
		min: min,
		max: max,
	};
};

export type LootCollection = {
	name: ItemNames;
	count: number;
}[];


//********************************************************
// state
//********************************************************

export type State = "Modal" | "Tick" | "Combat";
export const [pause, setPause] = createSignal(false);
export const [opponent, setOpponent] = createStore(cloneDeep(enemyList.bandit));

// Gamestate intended for persistence
export const [state, setState] = createStore({
	// State version for ensuring compatibility with save data
	version: 9,
	// State machine state
	state: "Tick" as State,
	previousState: "Tick" as State,
	//Gamedata on the various actions
	meditate: {
		tickSpeed: 0.5,
	},
	train: {
		tickSpeed: 1,
		active: false,
	},
	combat: {
		tickSpeed: 0.0001,
		turn: 0,
		dodgeChance: 0,
	},
	adventure: {
		tickSpeed: 1,
		location: "VerdantFields" as AreaNames,
		areas: {
			"VerdantFields": {
				name: "VerdantFields",
				unlocked: true,
				tickCount: 0,
				unlocks: {
					bossBeaten: false,
				}
			} as AreaState,
			"HollowWoods": {
				name: "HollowWoods",
				unlocked: false,
				tickCount: 0,
				unlocks: {

				}
			} as AreaState,
		} as Record<AreaNames, AreaState>,
	},
	// Player's current mana
	mana: 10,
	// Player's maximum mana
	maxMana: 10,
	// Player's passive mana regeneration
	passiveManaRegen: 1,
	// Current % of tick bar
	bar: 0.0,
	// Player's current action
	action: "Meditate" as Action,
	previousAction: "Meditate" as Action,
	// Player's current rank
	rank: 0,
	// Player's magic aspect
	aspect: undefined as Aspect | undefined,
	// Player's known techniques
	techniques: [] as Technique[],
	trainingTechnique: -1,
	// Player's meditation techniques
	meditationTechniques: [] as meditationTechnique[],
	activeMeditationTechnique: 0,
	// Player's helth points for combat
	health: 0,
	// Player's inventory, item name - item count
	inventory: [
		{ item: items["Health Potion"], quantity: 3 },
		{
			item: items["Mana Potion"],
			quantity: 3,
		},
		{
			item: items["Sword"],
			quantity: 1,
		},
	] as {
		item: Item;
		quantity: number;
	}[],
	inventoryCapacity: 20,
	equippedWeapon: undefined as Weapon | undefined,
	coins: 0,
	// Queue of modal's to appear
	modalMessages: [] as ModalMessageType[],
	autoAdventure: false,
	weaponDamageBuff: 0,
});

export const changeState = (newState: State) => {
	setState("previousState", state.state);
	setState("state", newState);
};

//********************************************************
// Combat State
//********************************************************

export type combatAction = "technique" | "item" | "weapon";

export const damageFromWeapon = createMemo(() => {
	let damageCount = 0;
	let physicalBonus = 0;
	state.techniques.forEach((e, i) => {
		if (e.active === true || e.onGoing === true) {
			if (e.effect === "buildingPhysicalBonus") {
				physicalBonus += e.aggregateEffect;
			} else if (e.effect === "enhanceWeapon") {
				physicalBonus += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	if (actionChoice() === 3) {
		if (state.equippedWeapon !== undefined) {
			damageCount += state.equippedWeapon.damage + physicalBonus;
		} else {
			damageCount += 3 + physicalBonus;
		}
	}
	return damageCount;
});

export const damageToTarget = createMemo(() => {
	let damageCount = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			if (e.effect === "damage") {
				damageCount += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	damageCount += damageFromWeapon();

	return damageCount;
});

export const damageToArea = createMemo(() => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			if (e.effect === "ongoingAreaDamage") {
				count += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	return count;
});

export const damageThorns = createMemo(() => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			if (e.effect === "thorns") {
				count += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	return count;
});

export const manaGainFromTechniques = createMemo(() => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			let multiplier = effectMultiplier(e.multiplier);
			count += 1.2 * multiplier;
		}
	});
	return count;
});

export const damageIncreasingTargetCount = () => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			if (e.effect === "increasingTargetCountDamage") {
				count += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	return count;
};

export const targetsIncreasingTargetCount = (targetCount: number) => {
	// TODO: fix targetting, currently alwaysa targets from the top
	let targets: number[] = [];
	//targets.push(combatState.activeEnemy);
	for (let i = 0; i < targetCount; i++) {
		targets.push(i);
	}
	return targets;
};

export const [combatState, setCombatState] = createStore({
	opponents: [] as Enemy[],
	activeEnemy: 0,
	action: 0,
	loot: [] as LootTable,
	coinMin: 0,
	coinMax: 0,
	returnState: "Tick" as State,
	returnFunction: undefined as undefined | (() => void),
});


//********************************************************
// helper functions
//********************************************************

export const persist = () => {
	localStorage.setItem("state", JSON.stringify(state));

	toast("Data Saved");
};

export const load = () => {
	const rawState = localStorage.getItem("state");
	if (rawState) {
		const loadState = JSON.parse(rawState) as typeof state;
		if (loadState.version === state.version) {
			setState(loadState);
		} else {
			localStorage.clear();
		}
	}
	toast("Data Loaded");
};
// Code to check for save data
if (localStorage.getItem("state")) {
	load();
} else {
	intro();
}

export const clear = () => {
	localStorage.clear();
	toast("Data Cleared");
};

export const maxHealth = () => {
	return state.rank * 10;
};

export const hasItem = (item: ItemNames) => {
	let has = false;
	state.inventory.forEach((e) => {
		if (e.item.name === item) {
			has = true;
		}
	});
	return has;
};

export const howManyOfItem = (item: ItemNames) => {
	let count = 0;
	state.inventory.forEach((e) => {
		if (e.item.name === item) {
			count = e.quantity;
		}
	});
};

export const inventoryRemove = (item: ItemNames) => {
	state.inventory.forEach((e, i) => {
		if (e.item.name === item) {
			const arr = state.inventory.slice();
			arr.splice(i, 1);
			setState("inventory", arr);
		}
	});
};

export const inventoryRemoveQuantity = (item: ItemNames, quantity: number) => {
	state.inventory.forEach((e, i) => {
		if (e.item.name === item) {
			setState("inventory", i, "quantity", (q) => q - quantity);
			if (state.inventory[i].quantity <= 0) {
				inventoryRemove(e.item.name);
			}
		}
	});
};

export const inventoryAtCapacity = () => {
	return state.inventory.length > state.inventoryCapacity;
};

export const inventoryAdd = (item: ItemNames, quantity: number) => {
	const arr = state.inventory.slice();
	if (hasItem(item)) {
		const index = arr.findIndex((e) => e.item.name === item);
		setState("inventory", index, "quantity", (num) => num + quantity);
	} else {
		console.log(item)
		arr.push({ item: items[item] as Item, quantity: quantity });
		setState("inventory", arr);
	}
};

// Helper function for finding the current action's tickSpeed
export const tickSpeed = () => {
	switch (state.action) {
		case "Meditate":
			return state.meditate.tickSpeed;
		case "Train":
			return state.train.tickSpeed;
		case "Adventure":
			return state.adventure.tickSpeed;
	}
};

// Helper Function to call the tick method for the current action
export const tick = {
	Train: () => {
		trainTick();
	},
	Meditate: () => {
		meditateTick();
	},
	Adventure: () => {
		adventureTick();
	},
};

export const canAdvance = () => {
	return state.maxMana >= rankInfo[state.rank].advMana;
};

export const advance = () => {
	if (canAdvance()) {
		setState("rank", (rank) => rank + 1)
		setState("train", "active", false)
	}
};

export const setAction = (action: Action) => {
	setState("previousAction", state.action);
	setState("action", action);
	setPause(false);
};

export const actionButton = (action: Action) => {
	setAction(action)
	if (action === "Train") {
		setState("train", "active", true)
	} else {
		setState("train", "active", false)
	}
};

export const resetActiveTechniques = () => {
	state.techniques.forEach((item, i) => {
		setState("techniques", i, "active", false);
	});
};

// Memo for calculating mana per tick
export const tickMana = createMemo(() => {
	let total = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			const cost =
				(e.baseCost - (e.mastery / 3000) * (e.baseCost - e.minCost)) *
				Math.pow(e.multiplier, 3);
			//setState("techniques", i, "currentCost", cost);
			total += cost;
		}
	});
	return total;
});

export const activeTechniqueCount = () => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active) {
			count += 1;
		}
	});
	return count;
};

export const addCoins = (min: number, max: number) => {
	const coins = Math.floor(Math.random() * (max - min + 1)) + min;
	setState("coins", (c) => c + coins);
	toast(`${coins} coins added`);
};

export const clearNotOngoing = () => {
	state.techniques.forEach((item, i) => {
		if (item.active && !item.onGoing) {
			setState("techniques", i, "active", false);
		}
	});
};

export const setArea = (area: AreaNames) => {
	setState("adventure", "location", area)
}
