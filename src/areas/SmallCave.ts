
import { initCombat } from "../functions/combatMethods";
import { sendLoot, sendModal } from "../state/modalMessages";
import { addCoins, lootEntry, setState, state } from "../state/store";
import { VerdantFields } from "./VerdantFields";
import { Area } from "./area";

export const SmallCave: Area = {
	name: "Small Cave",
	type: "dungeon",
	unlockThresholds: {
		beatDungeon: 15,
	},
	travelTo: 0,
	subArea: true,
	subAreaTo: "VerdantFields",
	endExploration: () => {
		if (state.adventure.currentRun >= SmallCave.unlockThresholds.beatDungeon) {
			sendModal("You have beaten the dungeon! Enjoy your prize.")
			sendLoot([
				{
					name: "Health Potion",
					count: 15
				},
				{
					name: "Mana Potion",
					count: 15
				},
			])
			addCoins(500, 500)
			setState("adventure", "areas", "SmallCave", "unlocks", "beaten", true)
		}
	},
	commonEvents: [
		{
			name: "a Slime",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["slime"],
					[
						lootEntry("Goo", 40, 1, 3)
					],
					5,
					15
				)
			}
		},
	],
	uncommonEvents: [
		{
			name: "a few Slimes",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["slime", "slime", "slime"],
					[
						lootEntry("Goo", 75, 2, 4)
					],
					10,
					25
				)
			}
		},
	],
	rareEvents: [
		{
			name: "a Goblin",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["goblin"],
					[
						lootEntry("Dagger", 50, 1, 1)
					],
					10,
					30
				)
			}
		}
	],
	epicEvents: [],
}
