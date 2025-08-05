import { initCombat } from "../functions/combatMethods";
import { lootEntry, state } from "../state/store";
import { VerdantFields } from "./VerdantFields";
import { Area } from "./area";

export const QiBearDen: Area = {
	unlockThresholds: {},
	subArea: true,
	subAreaTo: "VerdantFields",
	endExploration: () => { },
	commonEvents: [
		{
			name: "a Bear",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bear"],
					[
						lootEntry("Berry", 75, 5, 10)
					],
					5,
					15
				)
			}
		},
	],
	uncommonEvents: [
		{
			name: "a few Bears",
			isUnlocked: () => true,
			activation: () => {
				initCombat(
					["bear", "bear", "bear"],
					[
						lootEntry("Berry", 75, 5, 10)
					],
					50,
					75
				)
			}
		},
	],
	rareEvents: [
		{
			name: "a Qi Bear",
			isUnlocked: () => true,
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
		}
	],
	epicEvents: [],
}
