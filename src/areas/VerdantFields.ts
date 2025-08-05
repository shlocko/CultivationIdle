import { initCombat, pickLoot } from "../functions/combatMethods";
import { Enemies } from "../state/enemies";
import { Event } from "../state/events";
import { ModalMessage, sendLoot, sendModal } from "../state/modalMessages";
import { Item, addCoins, lootEntry, setAction, setState, state } from "../state/store";
import { items } from "../state/items";
import { cloneDeep, uniq } from "lodash";
import { beginnerBoss } from "../functions/sequenceMethods";
import { Area } from "./area";

export const VerdantFields: Area = {
	unlockThresholds: {
		"nextArea": 5,
	},
	subArea: false,
	subAreaTo: null,
	commonEvents: [
		{
			name: "the Boss",
			isUnlocked: () => {
				if (
					state.adventure.areas.VerdantFields.tickCount >=
					VerdantFields.unlockThresholds.nextArea && state.adventure.areas.VerdantFields.unlocks.bossBeaten == false
				) {
					return true;
				} else {
					return false;
				}
			},
			activation: () => {
				//console.log("activation");
				beginnerBoss();
			},
		},
		{
			name: "Hollow Woods",
			isUnlocked: () => {
				if (state.adventure.areas["VerdantFields"].tickCount >=
					VerdantFields.unlockThresholds["nextArea"] &&
					state.adventure.areas["VerdantFields"].unlocks["bossBeaten"] ==
					true && state.adventure.areas["HollowWoods"].unlocked === false) {
					return true;
				} else {
					return false;
				}
			},
			activation: () => {
				setState("adventure", "areas", "HollowWoods", "unlocked", true);
			},
		},
		{
			name: "a bandit",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				initCombat(
					["bandit"],
					[
						lootEntry("Health Potion", 50, 1, 5),
						lootEntry("Mana Potion", 50, 1, 5),
						lootEntry("Dagger", 10, 1, 1),
					],
					10,
					100,
					() => () => {
						sendModal("Bandit test")
					}
				);
			},
		} as Event,
		{
			name: "a couple goblins",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				initCombat(
					["goblin", "goblin"],
					[
						lootEntry("Health Potion", 50, 1, 5),
						lootEntry("Mana Potion", 50, 1, 5),
						lootEntry("Dagger", 10, 1, 1),
					],
					40,
					150,
				);
			},
		} as Event,
		{
			name: "a bear",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				initCombat(
					["bear"],
					[
						lootEntry("Health Potion", 50, 1, 5),
						lootEntry("Mana Potion", 50, 1, 5),
						lootEntry("Berry", 90, 1, 1),
					],
					10,
					100,
				);
			},
		} as Event,
	],
	uncommonEvents: [
		{
			name: "a few bandits",
			isUnlocked: () => state.rank >= 3,
			activation: () => {
				initCombat(
					["bandit", "bandit", "bandit"],
					[
						lootEntry("Health Potion", 70, 1, 7),
						lootEntry("Mana Potion", 70, 1, 7),
						lootEntry("Sword", 20, 1, 3),
					],
					100,
					500,
				);
			},
		} as Event,
		{
			name: "a wandering knight",
			isUnlocked: () => state.rank >= 4,
			activation: () => {
				initCombat(
					["wanderingKnight"],
					[
						lootEntry("Health Potion", 70, 1, 7),
						lootEntry("Mana Potion", 70, 1, 7),
						lootEntry("Axe", 10, 1, 1),
					],
					1000,
					2500,
				);
			},
		} as Event,
	],
	rareEvents: [
		{
			name: "a small cache of loot",
			isUnlocked: () => true,
			activation: () => {
				addCoins(100, 1000);
				sendLoot(
					pickLoot([
						lootEntry("Health Potion", 70, 1, 3),
						lootEntry("Mana Potion", 70, 1, 3),
						lootEntry("Herb", 100, 1, 10),
					]),
				);
			},
		},
	],
	epicEvents: [],
};
