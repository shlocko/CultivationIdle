import { Technique } from "./store";

export const techniques = {
	Fire: [
		{
			name: "Fire Bolt",
			onGoing: false,
			active: false,
			continuous: false,
			aspect: "Fire",
			type: "Range",
			baseCost: 5,
			minCost: 1,
			effect: "damage",
			customEffect: undefined,
			magnitude: 3,
			aggregateEffect: 0,
			description: "Fire a small ball of fire at the target",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Clense wounds in flame",
			onGoing: false,
			active: false,
			continuous: false,
			aspect: "Fire",
			type: "Enhancement",
			baseCost: 5,
			minCost: 1,
			effect: "heal",
			customEffect: undefined,
			magnitude: 1,
			aggregateEffect: 0,
			description: "Sear your wounds closed",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Burn Area",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "Fire",
			type: "Area",
			baseCost: 6,
			minCost: 2,
			effect: "ongoingAreaDamage",
			customEffect: undefined,
			magnitude: 2,
			aggregateEffect: 0,
			description:
				"Set the battle area aflame, damaging target every round it is maintained",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Ignite Weapon",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "Fire",
			type: "Enhancement",
			baseCost: 5,
			minCost: 1,
			effect: "enhanceWeapon",
			customEffect: undefined,
			magnitude: 3,
			aggregateEffect: 0,
			description: "Ignite your weapon, allowing it to deal more damage",
			mastery: 1,
			multiplier: 1,
		},
	] as Technique[],
	Water: [
		{
			name: "Water Whip",
			onGoing: false,
			active: false,
			continuous: false,
			aspect: "Water",
			type: "Range",
			baseCost: 5,
			minCost: 1,
			effect: "damage",
			customEffect: undefined,
			magnitude: 5,
			aggregateEffect: 0,
			description: "Send a whip of water at the target",
			mastery: 1,
			multiplier: 1,
		},
	] as Technique[],
	Sword: [
		{
			name: "Flying Slash",
			onGoing: false,
			active: false,
			continuous: false,
			aspect: "Sword",
			type: "Range",
			baseCost: 5,
			minCost: 1,
			effect: "damage",
			customEffect: undefined,
			magnitude: 5,
			aggregateEffect: 0,
			description: "Send a wave of sword mana flying towards your target",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Enhance Like A Sword",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "Sword",
			type: "Enhancement",
			baseCost: 3,
			minCost: 1,
			effect: "enhanceWeapon",
			customEffect: undefined,
			magnitude: 5,
			aggregateEffect: 0,
			description: "Enhance your weapon with sword mana",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Conjure Flying Sword",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "Sword",
			type: "Shaper",
			baseCost: 5,
			minCost: 2,
			effect: "increasingTargetCountDamage",
			customEffect: undefined,
			magnitude: 4,
			aggregateEffect: 0,
			description: "Conjure a flying sword to attack your enemies",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Building Sword",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "sword",
			baseCost: 4,
			minCost: 2,
			effect: "buildingPhysicalBonus",
			customEffect: undefined,
			magnitude: 2,
			aggregateEffect: 0,
			description:
				"Imbue your weapon with sword mana, increasing its damage more for each turn this is active",
			mastery: 1,
			multiplier: 1,
		},
		{
			name: "Shape defensive swords",
			onGoing: false,
			active: false,
			continuous: true,
			aspect: "sword",
			baseCost: 6,
			minCost: 2,
			effect: "thorns",
			customEffect: undefined,
			magnitude: 2,
			aggregateEffect: 0,
			description:
				"Shape your mana into physical swords that will defend you, striking anyone who attempts to strike you",
			mastery: 1,
			multiplier: 1,
		},
	] as Technique[],
};
