import { initCombat, pickLoot } from "../functions/combatMethods";
import { Enemies } from "../state/enemies";
import { Event } from "../state/events";
import { ModalMessage, sendLoot, sendModal } from "../state/modalMessages";
import { Item, addCoins, combatState, lootEntry, setAction, setCombatState, setState, state } from "../state/store";
import { items } from "../state/items";
import { cloneDeep, uniq } from "lodash";
import { beginnerBoss } from "../functions/sequenceMethods";
import { Area } from "./area";

export const VerdantFields: Area = {
	name: "Verdant Fields",
	type: "normal",
	unlockThresholds: {
		"HollowWoods": 100,
		"town": 20,
	},
	travelTo: 5,
	subArea: false,
	subAreaTo: undefined,
	endExploration: () => { },

	commonEvents: [
		{
			name: "a Small Cave",
			isUnlocked: () => !state.adventure.areas.SmallCave.unlocked,
			activation: () => {
				sendModal("You have found a Small Cave. Enter it and conquer the dungeon within!");
				setState("adventure", "areas", "SmallCave", "unlocked", true);
			}
		},
		{
			name: "the Hollow Woods",
			isUnlocked: () => state.adventure.areas.VerdantFields.tickCount >= VerdantFields.unlockThresholds.HollowWoods
				&& !state.adventure.areas.HollowWoods.unlocked,
			activation: () => {
				sendModal("You approach the edge of a dark forest: the Hollow Woods.");
				setState("adventure", "areas", "HollowWoods", "unlocked", true);
			},
		},
		{
			name: "a Wandering Slime",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["slime"],
					[lootEntry("Goo", 90, 1, 2)],
					5,
					12
				);
			}
		},
		{
			name: "a Bird",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bird"],
					[lootEntry("Berry", 100, 1, 2)],
					5,
					10
				);
			}
		},
		{
			name: "a Goblin Scout",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["goblin"],
					[
						lootEntry("Dagger", 60, 1, 1),
						lootEntry("Health Potion", 5, 1, 2)
					],
					5,
					15
				);
			}
		},
	],

	uncommonEvents: [
		{
			name: "the Town",
			isUnlocked: () => state.adventure.areas.VerdantFields.tickCount >= VerdantFields.unlockThresholds.town
				&& state.adventure.currentRun >= 10
				&& !state.adventure.areas.VerdantFields.unlocks.town,
			activation: () => {
				sendModal("You have encountered the town of Greenrest.");
				sendModal("You set up camp in town, and will use it as a resting point in the future!");
				setState("adventure", "areas", "VerdantFields", "unlocks", "town", true);
			}
		},
		{
			name: "a Goblin Ambush",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["goblin", "goblin"],
					[
						lootEntry("Dagger", 75, 1, 2),
						lootEntry("Health Potion", 10, 1, 2)
					],
					20,
					40
				);
			}
		},
		{
			name: "a Slime Mound",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["slime", "slime", "slime"],
					[
						lootEntry("Goo", 100, 5, 10),
						lootEntry("Health Potion", 10, 1, 2)
					],
					20,
					40
				);
			}
		},
		{
			name: "a Bear",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bear"],
					[
						lootEntry("Berry", 85, 1, 5)
					],
					20,
					40
				);
			}
		},

	],

	rareEvents: [
		{
			name: "a couple Bears",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bear", "bear"],
					[
						lootEntry("Berry", 100, 3, 6),
						lootEntry("Health Potion", 5, 1, 1)
					],
					25,
					50
				);
			}
		},
		{
			name: "a Qi Bear",
			isUnlocked: () => state.adventure.areas.HollowWoods.unlocked,
			activation: () => {
				initCombat(
					["qiBear"],
					[
						lootEntry("Berry", 100, 5, 12),
						lootEntry("Herb", 60, 1, 2)
					],
					45,
					80
				);
			}
		},
	],

	epicEvents: [
		{
			name: "a Qi Bear Den",
			isUnlocked: () => !state.adventure.areas.QiBearDen.unlocked,
			activation: () => {
				sendModal("You have encoutered the den of a Qi Bear. Defeat its defenders to gain access.");
				initCombat(
					["Qi Bear", "bear", "bear"],
					[],
					0,
					0,
					() => () => {
						if (combatState.opponents.length === 0) {
							sendModal("You've defeated defenders. You have gained access to the Qi Bear Den.");
							setState("adventure", "areas", "QiBearDen", "unlocked", true);
						} else {
							sendModal("The Bears overpowered you. Train and try again!");
						}
					}
				);
			}
		},
	],
};
