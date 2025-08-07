import { createSignal, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import {
	adventureTick,
	meditateTick,
	trainTick,
} from "../functions/tickMethods";
import toast from "solid-toast";
import { ModalMessageType, sendAspectChoice, sendMeditationTechniqueChoice, sendModal, sendTechniqueChoice } from "./modalMessages";
import {
	EffectType,
	techniqueCustomEffect
} from "../functions/techniqueMethods";
import { Enemy, enemyList } from "./enemies";
import { cloneDeep } from "lodash";
import { effectMultiplier } from "../functions/combatMethods";
import { actionChoice } from "../components/Combat";
import { ItemNames, items } from "./items";
import { intro } from "../functions/sequenceMethods";
import { AreaName, AreaState, areas } from "../areas/area";
import { QiBearDen } from "../areas/QiBearDen";
import { redirect, useNavigate } from "@solidjs/router";

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
	name: ItemNames;
	type: "weapon";
	damage: number;
	weaponType: WeaponType;
};

export type Consumable = {
	name: ItemNames;
	type: "consumable";
};

export type Material = {
	name: ItemNames;
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
export const [bar, setBar] = createSignal(0.0);
export const [navigate, setNavigate] = createSignal<string | null>(null)

// Gamestate intended for persistence
export const [state, setState] = createStore({
	// State version for ensuring compatibility with save data
	version: 15,
	// State machine state
	state: "Tick" as State,
	previousState: "Tick" as State,
	timeStamp: Date.now(),
	offlineTrainingEfficiency: 0.01,
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
		location: "VerdantFields" as AreaName,
		subLocation: undefined as AreaName | undefined,
		currentRun: 0,
		travel: {
			active: false,
			destination: undefined as AreaName | undefined,
			ticks: 0,
		},
		areas: {
			"VerdantFields": {
				name: "VerdantFields",
				unlocked: true,
				tickCount: 0,
				unlocks: {
					town: false,
				},
				longestRun: 0,
			},
			"QiBearDen": {
				name: "QiBearDen",
				unlocked: false,
				tickCount: 0,
				unlocks: {},
				longestRun: 0,
			},
			"SmallCave": {
				name: "SmallCave",
				unlocked: false,
				tickCount: 0,
				unlocks: {
					beaten: false,
				},
				longestRun: 0
			},
			"HollowWoods": {
				name: "HollowWoods",
				unlocked: true,
				tickCount: 0,
				unlocks: {
					town: false,
				},
				longestRun: 0,
			},
		} as Record<AreaName, AreaState>,
	},
	// Player's current mana
	mana: 10,
	// Player's maximum mana
	maxMana: 10,
	// Player's passive mana regeneration
	passiveManaRegen: 1,
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
	unlocks: {
	}
});

export const changeState = (newState: State) => {
	setState("previousState", state.state);
	setState("state", newState);
};

//********************************************************
// Combat State
//********************************************************

export type combatAction = "technique" | "item" | "weapon";


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
	return tickMana() / 4;
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


export const getLocation = () => {
	return state.adventure.subLocation || state.adventure.location
}

export const endExploration = () => {
	areas[getLocation()].endExploration()
	setState("adventure", "travel", "active", false)
}

export const setAction = (action: Action) => {
	if (state.action === "Adventure") {
		endExploration()
	}
	if (action === "Adventure") setState("adventure", "currentRun", 0)
	setState("previousAction", state.action);
	setState("action", action);
	setPause(false);
};

// Set current action as if button was clicked by user
export const actionButton = (action: Action) => {
	setAction(action)
	if (action === "Train") {
		setState("train", "active", true)
	} else {
		setState("train", "active", false)
	}
};

export const persist = () => {
	localStorage.setItem("state", JSON.stringify(state));

	//toast("Data Saved");
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
	actionButton("Meditate")
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
		sendModal("You feel the Qi in your core begin to condense. You feel your power has taken a quantitative leap forwards.")
		if (state.aspect === undefined) {
			sendAspectChoice();
		}
		sendTechniqueChoice();
		sendMeditationTechniqueChoice();
		setState("rank", (rank) => rank + 1)
		setState("train", "active", false)
		setState("health", maxHealth())
		setState("mana", state.maxMana)
		actionButton("Meditate")
		// Messages and effects per rank
		switch (state.rank) {
			case 1: {
			}
			case 2: {

			}
		}

	};
}


export const resetActiveTechniques = () => {
	state.techniques.forEach((item, i) => {
		setState("techniques", i, "active", false);
	});
};


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

export const setArea = (area: AreaName) => {
	if (areas[area].subArea) {
		setState("adventure", "location", areas[area].subAreaTo!)
		setState("adventure", "subLocation", area)
	} else {
		setState("adventure", "location", area)
		setState("adventure", "subLocation", undefined)
	}
}


export const getPassiveManaRegen = () => {
	let count = 0
	let manaRegenLevel = state.meditationTechniques.find((item) => item.id === "manaregen")?.level
	let mixedRegenLevel = state.meditationTechniques.find((item) => item.id === "mixedregen")?.level

	if (manaRegenLevel) {
		count += manaRegenLevel * 2
	}
	if (mixedRegenLevel) {
		count += mixedRegenLevel
	}

	return count + 1
}

export const getPassiveHealthRegen = () => {
	let count = 0
	let healthRegenLevel = state.meditationTechniques.find((item) => item.id === "healthregen")?.level
	let mixedRegenLevel = state.meditationTechniques.find((item) => item.id === "mixedregen")?.level

	if (healthRegenLevel) {
		count += healthRegenLevel
	}
	if (mixedRegenLevel) {
		count += mixedRegenLevel * 0.5
	}

	return count + 1
}

export const getOfflineManaGainPerSecond = () => {
	return (getPassiveManaRegen() / 4 * state.offlineTrainingEfficiency)
}

export const travel = (destination: AreaName, ticks: number) => {
	setState("adventure", "travel", "destination", destination)
	setState("adventure", "travel", "ticks", ticks)
	setState("adventure", "travel", "active", true)
	setNavigate("/adventure")
	setAction("Adventure")
}
