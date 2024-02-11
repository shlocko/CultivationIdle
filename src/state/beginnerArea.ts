import { init } from "../functions/combatMethods";
import { Enemies } from "./enemies";
import { Event } from "./events";
import { sendModal } from "./modalMessages";
import { setAction, setState, state } from "./store";

export const beginnerArea = {
	enemies: ["bandit", "bear"] as Enemies[],
	hardEnemies: ["waderingKnight"] as Enemies[],
	commonEvents: [
		{
			name: "a bandit",
			isUnlocked: () => state.rank >= 1,
			activation: () => {
				init(
					["bandit"],
					[
						{
							name: "Health Potion",
							chance: 50,
							min: 1,
							max: 5,
						},
						{
							name: "Mana Potion",
							chance: 50,
							min: 1,
							max: 5,
						},
						{
							name: "Sword",
							chance: 10,
							min: 1,
							max: 1,
						},
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
						{
							name: "Health Potion",
							chance: 50,
							min: 1,
							max: 5,
						},
						{
							name: "Mana Potion",
							chance: 50,
							min: 1,
							max: 5,
						},
						{
							name: "Sword",
							chance: 10,
							min: 1,
							max: 1,
						},
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
						{
							name: "Health Potion",
							chance: 70,
							min: 1,
							max: 7,
						},
						{
							name: "Mana Potion",
							chance: 70,
							min: 1,
							max: 7,
						},
						{
							name: "Sword",
							chance: 10,
							min: 1,
							max: 1,
						},
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
						{
							name: "Health Potion",
							chance: 70,
							min: 1,
							max: 7,
						},
						{
							name: "Mana Potion",
							chance: 70,
							min: 1,
							max: 7,
						},
						{
							name: "Sword",
							chance: 10,
							min: 1,
							max: 1,
						},
					],
					1000,
					2500,
				);
			},
		} as Event,
	],
	rareEvents: [],
};
