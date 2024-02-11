import { cloneDeep } from "lodash";
import { Enemies, enemyList } from "./enemies";
import { sendLoot, sendModal } from "./modalMessages";
import {
	Item,
	LootTable,
	addCoins,
	findFight,
	opponent,
	setAction,
	setOpponent,
	setState,
	state,
} from "./store";

export interface Event {
	name: string;
	isUnlocked: () => boolean;
	activation: Function;
}

// Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythical, Unique
