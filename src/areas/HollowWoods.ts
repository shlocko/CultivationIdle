import { initCombat } from "../functions/combatMethods";
import { sendModal } from "../state/modalMessages";
import { lootEntry } from "../state/store";
import { Area } from "./area";

export const HollowWoods: Area = {
	name: "Hollow Woods",
	type: "normal",
	unlockThresholds: {
		"peaksPass": 200,
	},
	travelTo: 10,
	subArea: false,
	subAreaTo: undefined,
	endExploration: () => { },
	commonEvents: [
		{
			name: "skeleman",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["skeleman"],
					[
						lootEntry("Sword", 10, 1, 1)
					],
					80,
					150
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
						lootEntry("Berry", 100, 5, 30),
						lootEntry("Herb", 60, 1, 10)
					],
					20,
					50
				)
			}
		},
		{
			name: "a Qi Bear",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["qiBear"],
					[
						lootEntry("Mana Potion", 85, 1, 1),
						lootEntry("Berry", 100, 5, 30),
						lootEntry("Herb", 60, 1, 10)
					],
					50,
					80
				)
			}
		},
		{
			name: "a Yellow Slime",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["yellowSlime"],
					[
						lootEntry("Mana Potion", 50, 1, 2),
						lootEntry("Goo", 100, 2, 10)
					],
					50,
					80
				)
			}
		},
	],
	uncommonEvents: [
		{
			name: "a group of Slimes",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["yellowSlime", "slime", "slime", "slime"],
					[
						lootEntry("Health Potion", 20, 1, 2),
						lootEntry("Goo", 100, 5, 15)
					],
					50,
					80
				)
			}
		},
		{
			name: "a group of Bears",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["qiBear", "bear", "bear"],
					[
						lootEntry("Health Potion", 20, 1, 2),
						lootEntry("Mana Potion", 20, 1, 1)
					],
					80,
					150
				)
			}
		},
	],
	rareEvents: [
	],
	epicEvents: [],
}
