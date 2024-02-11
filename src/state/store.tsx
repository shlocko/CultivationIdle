import { createSignal, createMemo, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";
import {
	adventureTick,
	meditateTick,
	trainTick,
} from "../functions/tickMethods";
import toast from "solid-toast";
import {
	ChooseModalState,
	ModalMessageType,
	TextModal,
	sendModal,
} from "./modalMessages";
import {
	EffectType,
	techniqueCustomEffect,
} from "../functions/techniqueMethods";
import { Enemy, enemyList } from "./enemies";
import { cloneDeep } from "lodash";
import { effectMultiplier } from "../functions/combatMethods";
import { actionChoice } from "../components/Combat";

type Action = "Meditate" | "Train" | "Combat" | "Adventure";

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
	{
		name: "Foundation",
		advMana: 27,
	},
	{ name: "CoreFormation", advMana: 81 },
	{ name: "RedCore", advMana: 243 },
	{ name: "GreenCore", advMana: 729 },
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
	type: TechniqueType;
	baseCost: number;
	currentCost: number;
	minCost: number;
	magnitude: number;
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

export type Item =
	| "Health Potion"
	| "Mana Potion"
	| "Herb"
	| "Iron Bar"
	| "Sword"
	| "Berry"
	| "Fireroot"
	| "Blueleaf"
	| "Glass Bottle";

export type LootTable = {
	name: Item;
	chance: number;
	min: number;
	max: number;
}[];

export type LootCollection = Array<{
	name: Item;
	count: number;
}>;

export type Area = "BeginnerArea" | "SecondArea";

//********************************************************
// state
//********************************************************

export type State = "Modal" | "Tick" | "Combat";
export const [pause, setPause] = createSignal(false);
export const [opponent, setOpponent] = createStore(cloneDeep(enemyList.bandit));

// Gamestate intended for persistence
export const [state, setState] = createStore({
	// State version for ensuring compatibility with save data
	version: 5,
	// State machine state
	state: "Tick" as State,
	previousState: "Tick" as State,
	//Gamedata on the various actions
	meditate: {
		tickSpeed: 0.5,
	},
	train: {
		tickSpeed: 1,
	},
	combat: {
		tickSpeed: 0.0001,
		turn: 0,
	},
	adventure: {
		tickSpeed: 1,
		area: "BeginnerArea" as Area,
	},
	// Player's current mana
	mana: 80,
	// Player's maximum mana
	maxMana: 80,
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
	health: 20,
	// Player's inventory, item name - item count
	inventory: [
		{ item: "Health Potion", quantity: 1 },
		{ item: "Mana Potion", quantity: 3 },
		{ item: "Herb", quantity: 4 },
	] as { item: Item; quantity: number }[],
	inventoryCapacity: 20,
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

export const damageToTarget = createMemo(() => {
	let count = 0;
	state.techniques.forEach((e, i) => {
		if (e.active || e.onGoing) {
			if (e.effect === "damage") {
				count += e.magnitude * effectMultiplier(e.multiplier);
			}
		}
	});
	if (actionChoice() === 3) {
		count += 3;
	}
	return count;
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

export const [combatState, setCombatState] = createStore({
	opponents: [] as Enemy[],
	activeEnemy: 0,
	loot: [] as LootTable,
	coinMin: 0,
	coinMax: 0,
	returnState: "Tick" as State,
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
		const loadState = JSON.parse(rawState);
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
	sendModal(
		"You are embarking down a new path, one of magic and danger. You must train yourself and advance to prepare for what lies ahead!",
	);
}

export const clear = () => {
	localStorage.clear();
	toast("Data Cleared");
};

export const maxHealth = () => {
	return state.rank * 10;
};

export const hasItem = (item: Item) => {
	let has = false;
	state.inventory.forEach((e) => {
		if (e.item === item) {
			has = true;
		}
	});
	return has;
};

export const howManyOfItem = (item: Item) => {
	let count = 0;
	state.inventory.forEach((e) => {
		if (e.item === item) {
			count = e.quantity;
		}
	});
};

export const inventoryRemove = (item: Item) => {
	state.inventory.forEach((e, i) => {
		if (e.item === item) {
			const arr = state.inventory.slice();
			arr.splice(i, 1);
			setState("inventory", arr);
		}
	});
};

export const inventoryRemoveQuantity = (item: Item, quantity: number) => {
	state.inventory.forEach((e, i) => {
		if (e.item === item) {
			setState("inventory", i, "quantity", (q) => q - quantity);
			if (state.inventory[i].quantity <= 0) {
				inventoryRemove(e.item);
			}
		}
	});
};

export const inventoryAtCapacity = () => {
	return state.inventory.length > state.inventoryCapacity;
};

export const inventoryAdd = (item: Item, quantity: number) => {
	const arr = state.inventory.slice();
	if (hasItem(item)) {
		const index = arr.findIndex((e) => e.item === item);
		setState("inventory", index, "quantity", (num) => num + quantity);
	} else {
		arr.push({ item: item, quantity: quantity });
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
		case "Combat":
			return state.combat.tickSpeed;
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
	Combat: () => {
		combatTick();
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
		setState("rank", (rank) => rank + 1);
	}
};

export const setAction = (action: Action) => {
	setState("previousAction", state.action);
	setState("action", action);
	setPause(false);
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
				e.multiplier;
			setState("techniques", i, "currentCost", cost);
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
