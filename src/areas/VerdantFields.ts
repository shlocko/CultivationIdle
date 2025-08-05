import { initCombat, pickLoot } from "../functions/combatMethods";
import { Enemies } from "../state/enemies";
import { Event } from "../state/events";
import { ModalMessage, sendLoot, sendModal } from "../state/modalMessages";
import { Item, addCoins, combatState, lootEntry, setAction, setState, state } from "../state/store";
import { items } from "../state/items";
import { cloneDeep, uniq } from "lodash";
import { beginnerBoss } from "../functions/sequenceMethods";
import { Area } from "./area";

export const VerdantFields: Area = {
	unlockThresholds: {
		"HollowWoods": 100,
	},
	subArea: false,
	subAreaTo: null,
	commonEvents: [
		{
			name: "the Hollow Woods",
			isUnlocked: () => {
				if (state.adventure.areas.VerdantFields.tickCount >=
					VerdantFields.unlockThresholds.HollowWoods &&
					state.adventure.areas.HollowWoods.unlocked === false) {
					return true;
				} else {
					return false;
				}
			},
			activation: () => {
				sendModal("You approach the edge of a dark forest. The Hollow Woods.")
				setState("adventure", "areas", "HollowWoods", "unlocked", true);
			},
		},
		{
			name: "a Slime",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["slime"],
					[
						lootEntry("Goo", 75, 1, 2)
					],
					5,
					15
				)
			}
		},
		{
			name: "a Goblin",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["goblin"],
					[
						lootEntry("Dagger", 50, 1, 1),
						lootEntry("Health Potion", 10, 1, 3)
					],
					5,
					15
				)
			}
		},
		{
			name: "a Bear",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bear"],
					[
						lootEntry("Berry", 90, 1, 1),
					],
					5,
					20,
				);
			},
		},
	],
	uncommonEvents: [
		{
			name: "a couple Goblins",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["goblin", "goblin"],
					[
						lootEntry("Health Potion", 15, 1, 3),
						lootEntry("Mana Potion", 5, 1, 1),
						lootEntry("Dagger", 75, 1, 2),
					],
					20,
					45,
				);
			},
		},
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
		{
			name: "a Qi Bear",
			isUnlocked: () => state.adventure.areas.VerdantFields.unlocks.HollowWoods || state.adventure.areas.VerdantFields.unlocks.QiBearDen,
			activation: () => {
				initCombat(
					["qiBear"],
					[
						lootEntry("Mana Potion", 85, 1, 5),
						lootEntry("Berry", 100, 5, 30),
						lootEntry("Herb", 60, 1, 10)
					],
					50,
					100
				)
			}
		},
	],
	epicEvents: [
		{
			name: "a Qi Bear den",
			isUnlocked: () => !state.adventure.areas.QiBearDen.unlocked,
			activation: () => {
				sendModal("You stumble upon the den of a Qi Bear. Its protector looks angry.")
				sendModal("Defend yourself!")
				initCombat(
					["qiBear", "bear"],
					[],
					0,
					0,
					() => () => {
						if (combatState.opponents.length === 0) {
							sendModal("You have defeated the Qi Bear, and gained access to its den.")
							setState("adventure", "areas", "QiBearDen", "unlocked", true)
						} else {
							sendModal("The Qi Bear has bested you. Grow your strength and challenge it again.")
						}
					}
				)
			}
		},
	],
};
