import { init } from "../functions/combatMethods";
import { Enemies } from "./enemies";
import { Event } from "./events";
import { sendModal } from "./modalMessages";
import { Item, lootEntry, setAction, setState, state } from "./store";
import { items } from "./items";

export const beginnerArea = {
	commonEvents: [
		{
			name: "a bandit",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				init(
					["bandit"],
					[
						lootEntry("Health Potion", 50, 1, 5),
						lootEntry("Mana Potion", 50, 1, 5),
						lootEntry("Dagger", 10, 1, 1),
					],
					10,
					100,
				);
			},
		} as Event,
		{
			name: "a bear",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				init(
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
				init(
					["bandit", "bandit", "bandit"],
					[
						lootEntry("Health Potion", 70, 1, 7),
						lootEntry("Mana Potion", 70, 1, 7),
						lootEntry("Dagger", 20, 1, 3),
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
				init(
					["wanderingKnight"],
					[
						lootEntry("Health Potion", 70, 1, 7),
						lootEntry("Mana Potion", 70, 1, 7),
						lootEntry("Sword", 10, 1, 1),
					],
					1000,
					2500,
				);
			},
		} as Event,
	],
	rareEvents: [],
};
